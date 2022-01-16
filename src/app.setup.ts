import dotenv from "dotenv"
import express, { NextFunction, Request, Response } from "express"
import morgan from "morgan"
import path from "path"
import { setupRoutes } from "routes/routes"

// Setup dotenv
dotenv.config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"))

app.use(express.static(path.join(path.resolve(), "../client/build")))

// Redirect www to non-www
app.use(function (req: Request, res: Response, next: NextFunction) {
	if (req.headers.host !== undefined && req.headers.host.match(/^www/))
		res.redirect(
			"http://" + req.headers.host.replace(/^www\./, "") + req.url,
			301
		)
	next()
})

setupRoutes(app)

export default app
