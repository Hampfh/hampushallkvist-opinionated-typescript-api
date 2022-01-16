import express from "express"
import { apiRouter } from "routes/apiv1.routes"
import { publicRouter } from "routes/public.routes"

/**
 * This sets up the core routers, aka
 * the roots of the api such as public
 * access and the api endpoints
 */
export function setupRoutes(expressApp: express.Application) {
	expressApp.use("/api/v1", apiRouter)
	expressApp.use("/", publicRouter)
}
