import { Request } from "express"

declare global {
	export interface IRequestQuery<T> extends Request {
		query: T
	}

	interface IRequestBody<T> extends Request {
		body: T
	}
}
