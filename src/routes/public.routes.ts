import { Router } from "express"

export const publicRouter = Router({
	caseSensitive: true,
	strict: true
})

publicRouter.get("*", ({ res }) => {
	res?.status(200).json({
		message: `Welcome to the ${process.env.APP_NAME} api`
	})
})
