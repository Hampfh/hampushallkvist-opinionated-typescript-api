import { generateToken } from "core/token/token.logic"
import {
	getLeanUser,
	getUserFromToken
} from "core/user/logic/user_fetching.logic"
import { NextFunction, Request, Response } from "express"
import { StatusCodes } from "http-status-codes"
import Jwt from "jsonwebtoken"
import { DateTime } from "luxon"
import { trycatch } from "utilities/validate_async"

function extractTokenFromRequest(req: Request, cookieName: string): string {
	return process.env.NODE_ENV === "production"
		? req.signedCookies[cookieName]
		: req.cookies[cookieName]
}

function verifyJwt(jwt: string) {
	return Jwt.verify(jwt, process.env.JWT_SECRET as Jwt.Secret) as IJwt
}

/**
 * Reassures that the requesting user has a valid session active,
 * the user will otherwise be thrown out
 */
export async function authenticate(
	req: IAuthedRequest,
	res: Response,
	next: NextFunction
): Promise<unknown> {
	const authToken = extractTokenFromRequest(req, "auth-token")
	const refreshToken = extractTokenFromRequest(req, "auth-refresh")

	if (authToken == null && refreshToken == null) {
		return res.status(StatusCodes.UNAUTHORIZED).json({
			message: "No access or refresh token present"
		})
	}

	// Check if auth token is valid
	const authResult = await trycatch(async () => verifyJwt(authToken))
	if (authResult.error == null) {
		req.session = authResult.data
		return next()
	}

	const refreshResult = await trycatch(() =>
		getLeanUser({
			"tokens.token": refreshToken
		})
	)

	// If auth token is invalid or not present but the refreshtoken
	// exists then we refresh the session
	if (authResult.error != null && refreshResult.error == null)
		return refreshSession(req, res, next, refreshToken)

	return res.status(StatusCodes.UNAUTHORIZED).json({
		message: "Not authorized"
	})
}

async function generateAuthAndRefreshToken(jwtPayload: { usr: string }) {
	const refresh = generateToken()

	const authJwt = Jwt.sign(jwtPayload, process.env.JWT_SECRET, {
		expiresIn: "30min"
	})

	return { authJwt, refresh }
}

async function refreshSession(
	req: IAuthedRequest,
	res: Response,
	next: NextFunction,
	refreshToken: string
) {
	const userId = await getUserFromToken(refreshToken)

	if (userId == null) {
		return res.status(StatusCodes.UNAUTHORIZED).json({
			message: "No refresh token could be found"
		})
	}

	const jwtPayload = {
		usr: userId._id.toString()
	}
	const { authJwt, refresh } = await generateAuthAndRefreshToken(jwtPayload)
	// Set token in cookies
	// Set success response
	res.cookie("auth", authJwt, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production" ? true : false,
		signed: process.env.NODE_ENV === "production" ? true : false,
		expires: DateTime.now().plus({ minutes: 30 }).toJSDate()
	})
	res.cookie("refresh", refresh, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production" ? true : false,
		signed: process.env.NODE_ENV === "production" ? true : false,
		expires: DateTime.now().plus({ minutes: 30 }).toJSDate()
	})

	// Assign the new token to the request
	req.session = verifyJwt(authJwt) as unknown as IJwt

	next()
}
