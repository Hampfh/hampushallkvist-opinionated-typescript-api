import { Response } from "express"
import { deleteFields } from "field-modifier"
import { StatusCodes } from "http-status-codes"
import Joi from "joi"
import { UserAuthModel } from "models/user/userAuth.model"
import { trycatch } from "utilities/validate_async"

export type ModifiedRequest = IRequestQuery<{ username: string }>
export function getUserSchema() {
	return Joi.object({
		username: Joi.string().required()
	})
}

export async function controlGetUser(req: ModifiedRequest, res: Response) {
	const result = await trycatch(() =>
		UserAuthModel.findOne({
			where: {
				serviceUsername: req.query.username
			},
			include: [
				{
					association: UserAuthModel.associations.user
				}
			]
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
		user: deleteFields(["auth"], result.data)
	})
}
