import { NextFunction, Request, Response } from "express"
import Joi from "joi"
import { validateSchema } from "middlewares/schema_validator"

export type ISchemaGetUser = IRequestQuery<{ userId: string }>
export function validateGetUser(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const schema = Joi.object({
		userId: Joi.string()
	})
	validateSchema(schema, req, res, next, req.query)
}
