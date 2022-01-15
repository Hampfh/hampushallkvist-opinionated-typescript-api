import mongoose from "mongoose"

function getDbAuth() {
	if (process.env.NODE_ENV === "production") {
		return {
			username: process.env.DB_USER as string,
			password: process.env.DB_PASS as string
		}
	}
	return undefined
}

export async function connectDatabase() {
	return new Promise<void>((resolve, reject) => {
		mongoose.connect(
			`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
			{
				authSource: process.env.DB_AUTHSOURCE,
				auth: getDbAuth()
			}
		)

		mongoose.connection
			.on("open", () => {
				console.log("DB connection is up")
				resolve()
			})
			.on("error", (error) => {
				console.error(`Could not connect to database: ${error}`)
				reject()
			})
	})
}
