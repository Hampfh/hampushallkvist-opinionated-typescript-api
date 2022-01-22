import { Response } from "express"
import { deleteFields } from "field-modifier"
import { StatusCodes } from "http-status-codes"
import Joi from "joi"
import { trycatch } from "utilities/validate_async"
import { createUser } from "./logic/create_user.logic"

type ModifiedRequest = IRequestBody<{
	username: string
	email: string
	password: string
}>
export function postUserSchema() {
	return Joi.object({
		username: Joi.string().required(),
		email: Joi.string().required(),
		password: Joi.string().min(3).max(100).required()
	})
}

export async function controlCreateUser(req: ModifiedRequest, res: Response) {
	const result = await trycatch(() =>
		createUser(
			req.body.username,
			req.body.email,
			req.body.password,
			"internal"
		)
	)

	if (result.error)
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: "Internal server error" })
	else if (result.data == null) {
		return res.status(StatusCodes.NOT_FOUND).json({
			message: `User with name ${req.body.username} doesn't exist`
		})
	}

	return res.status(201).json({
		message: "Successfully created user",
		user: deleteFields(["hashedPassword"], result.data)
	})
}
