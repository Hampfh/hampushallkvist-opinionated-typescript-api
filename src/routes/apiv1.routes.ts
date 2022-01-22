import { controlCreateUser, postUserSchema } from "core/user/create.controller"
import { controlGetUser, getUserSchema } from "core/user/get.controller"
import { Router } from "express"
import { validateSchema as check } from "middlewares/schema_validator"

/**
 * All routes that should be included
 * in the api v1 implementation
 */
export const apiRouter = Router({
	caseSensitive: true,
	strict: true
})

apiRouter.get("/user", check(getUserSchema, "query"), controlGetUser)
apiRouter.post("/user", check(postUserSchema, "body"), controlCreateUser)
