import { authenticateDatabase, sequelize } from "models/db.init"
import { setupAssociations } from "models/setupAssociations"
import { setupModels } from "models/setupModels"
import app from "./app.setup"

app.listen(process.env.PORT, () => {
	console.log(`Server listening on ${process.env.PORT}`)
	setupModels(sequelize)
	setupAssociations()
	setTimeout(() => {
		authenticateDatabase(sequelize)
	}, 500)
})
