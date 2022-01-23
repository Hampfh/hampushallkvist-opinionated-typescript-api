import { newUserIsValid } from "core/user/logic/create_user.checks"
import { Response } from "express"
import { deleteFields } from "field-modifier"
import { StatusCodes } from "http-status-codes"
import Joi from "joi"
import { trycatch } from "utilities/validate_async"
import { createUser } from "./logic/create_user.logic"

type ModifiedRequest = IRequestBody<{
	name: string
	surname: string
	email: string
	password: string
}>
export function postUserSchema() {
	return Joi.object({
		name: Joi.string().required(),
		surname: Joi.string().required(),
		email: Joi.string().required(),
		password: Joi.string().min(3).max(100).required()
	})
}

export async function controlCreateUser(req: ModifiedRequest, res: Response) {
	const { valid, error } = await newUserIsValid({
		email: req.body.email
	})
	// If user is not valid for some reason we return
	if (!valid) {
		return res.status(400).json({
			message: error
		})
	}

	const result = await trycatch(() =>
		createUser(
			req.body.name,
			req.body.surname,
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
			message: `User with name ${req.body.name} ${req.body.surname} could not be created`
		})
	}

	return res.status(201).json({
		message: "Successfully created user",
		user: deleteFields(["auth"], result.data)
	})
}
