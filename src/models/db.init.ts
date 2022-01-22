import { Sequelize } from "sequelize"
import { trycatch } from "utilities/validate_async"

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env

export const sequelize = new Sequelize(
	`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
	{
		define: {
			timestamps: true
		}
	}
)

export async function authenticateDatabase(sequelize: Sequelize) {
	const result = await trycatch(async () => {
		await sequelize.authenticate()
	})
	if (result.error) {
		console.warn("Failed to connect to database: ", result.error)
		process.exit(1)
	}
	console.log(
		`Successfully connected to database ${DB_NAME} on ${DB_HOST}:${DB_PORT}`
	)
}
