import { NextFunction, Request, Response } from "express"
import StatusCodes from "http-status-codes"
import Joi from "joi"

export function validateSchema(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	schema: () => Joi.ObjectSchema<any>,
	type: "query" | "body"
) {
	return (req: Request, res: Response, next: NextFunction) => {
		const { error, value } = schema().validate(
			type === "body" ? req.body : req.query
		)
		if (error) {
			return res.status(StatusCodes.BAD_REQUEST).json({
				message: error.message
			})
		}
		// Update params of req object
		if (type === "body") req.body = value
		else req.query = value
		return next()
	}
}
