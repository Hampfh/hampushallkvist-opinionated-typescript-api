import { Request } from "express"
import { Document } from "mongoose"

declare global {
	export interface IRequestQuery<T> extends Request {
		query: T
	}

	interface IRequestBody<T> extends Request {
		body: T
	}

	interface IAuthedRequest extends Request {
		session: IJwt
		user: IUser & Document
	}
}
