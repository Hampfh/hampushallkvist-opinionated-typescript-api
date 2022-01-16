import { NextFunction, Response } from "express"
import { deleteFields } from "field-modifier"
import { StatusCodes } from "http-status-codes"
import Joi from "joi"
import { validateSchema } from "middlewares/schema_validator"
import { validateAsync } from "utilities/validate_async"
import { createUser } from "./logic/create_user.logic"

type ModifiedRequest = IRequestBody<{ username: string; password: string }>
export function validatePostUser(
	req: ModifiedRequest,
	res: Response,
	next: NextFunction
) {
	const schema = Joi.object({
		username: Joi.string().required(),
		password: Joi.string().min(3).max(100).required()
	})
	validateSchema(schema, req, res, next, "query")
}

export async function controlCreateUser(req: ModifiedRequest, res: Response) {
	const result = await validateAsync(
		async () => await createUser(req.body.username, req.body.password)
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

	return res.status(200).json({
		message: "Successfully fetched user",
		user: deleteFields(["hashedPassword"], result.data)
	})
}
