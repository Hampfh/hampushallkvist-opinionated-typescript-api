import express from "express"
import { apiRouter } from "routes/apiv1.routes"
import { publicRouter } from "routes/public.routes"

export function setupRoutes(expressApp: express.Application) {
	expressApp.use("/api/v1", apiRouter)
	expressApp.use("/", publicRouter)
}
