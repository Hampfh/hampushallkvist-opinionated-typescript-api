import { UserController } from "controllers/User.controller"
import { Router } from "express"
import { validateGetUser } from "validators/user.validators"

/**
 * All routes that should be included
 * in the api v1 implementation
 */
export const apiRouter = Router({
	caseSensitive: true,
	strict: true
})

apiRouter.get("/user", validateGetUser, UserController.read)
