import { controlGetUser, validateGetUser } from "core/user/get.controller"
import { Router } from "express"

/**
 * All routes that should be included
 * in the api v1 implementation
 */
export const apiRouter = Router({
	caseSensitive: true,
	strict: true
})

apiRouter.get("/user", validateGetUser, controlGetUser)
