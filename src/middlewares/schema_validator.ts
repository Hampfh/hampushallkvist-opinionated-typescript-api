import { NextFunction, Request, Response } from "express"
import StatusCodes from "http-status-codes"
import Joi from "joi"

export function validateSchema(
	schema: Joi.ObjectSchema<unknown>,
	req: Request,
	res: Response,
	next: NextFunction,
	checkObject: object // Would traditionally be either req.body or req.query
) {
	const { error, value } = schema.validate(checkObject)
	if (error) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: error.message
		})
	}
	req.body = value
	return next()
}
