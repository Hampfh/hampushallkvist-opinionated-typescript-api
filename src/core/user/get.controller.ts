import { getLeanUser } from "core/user/logic/user_fetching.logic"
import { NextFunction, Response } from "express"
import { deleteFields } from "field-modifier"
import { StatusCodes } from "http-status-codes"
import Joi from "joi"
import { validateSchema } from "middlewares/schema_validator"
import { validateAsync } from "utilities/validate_async"

export type ModifiedRequest = IRequestQuery<{ username: string }>
export function validateGetUser(
	req: ModifiedRequest,
	res: Response,
	next: NextFunction
) {
	const schema = Joi.object({
		username: Joi.string().required()
	})
	validateSchema(schema, req, res, next, "query")
}

export async function controlGetUser(req: ModifiedRequest, res: Response) {
	const result = await validateAsync(
		async () =>
			await getLeanUser({
				username: req.query.username
			})
	)

	if (result.error)
		return res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ message: "Internal server error" })
	else if (result.data == null) {
		return res.status(StatusCodes.NOT_FOUND).json({
			message: `User with name ${req.query.username} doesn't exist`
		})
	}

	return res.status(200).json({
		message: "Successfully fetched user",
		user: deleteFields(["hashedPassword"], result.data)
	})
}
