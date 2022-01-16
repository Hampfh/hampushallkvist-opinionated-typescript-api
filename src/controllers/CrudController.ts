/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express"

export class CrudController {
	protected identifier: string

	constructor(identifier: string) {
		this.identifier = identifier
	}

	public post(_: Request, __: Response, ___: NextFunction): unknown {
		console.warn(`${this.identifier} has not implemented a post method`)
		return
	}

	public read(_: Request, __: Response, ___: NextFunction): unknown {
		console.warn(`${this.identifier} has not implemented a read method`)
		return
	}

	public update(_: Request, __: Response, ___: NextFunction): unknown {
		console.warn(`${this.identifier} has not implemented an update method`)
		return
	}

	public delete(_: Request, __: Response, ___: NextFunction): unknown {
		console.warn(`${this.identifier} has not implemented a delete method`)
		return
	}
}
