import { Request, Response } from "express"
import { deleteFields } from "field-modifier"
import { StatusCodes } from "http-status-codes"
import { getLeanUser } from "logic/user.logic"
import { validateAsync } from "utilities/validate_async"
import { ISchemaGetUser } from "validators/user.validators"
import { CrudController } from "./CrudController"

class User extends CrudController {
	public async read(
		req: Request & ISchemaGetUser,
		res: Response
	): Promise<Response> {
		const result = await validateAsync(async () => {
			return await getLeanUser({
				_id: req.query.userId
			})
		})

		if (result.error)
			return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send()
		else if (result.data == null) {
			return res.status(StatusCodes.NOT_FOUND).json({
				message: `User with id ${req.query.userId} doesn't exist`
			})
		}

		return res.status(200).json({
			message: "Successfully fetched user",
			user: deleteFields(["hashedPassword"], result.data)
		})
	}
}

export const UserController = new User("UserController")
