import { ApolloServer } from "apollo-server-express"
import { resolvers } from "core/resolvers"
import { typeDefs } from "core/type_defs"
import http from "http"
import { authenticateDatabase, sequelize } from "models/db.init"
import { setupAssociations } from "models/setup_associations"
import { setupModels } from "models/setup_models"
import { buildGetApolloPlugins } from "utilities/apollo_server_plugins"
import app from "./app.setup"

async function startApolloServer() {
	const httpServer = http.createServer(app)
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		plugins: buildGetApolloPlugins(httpServer),
		introspection: process.env.NODE_ENV === "development"
	})

	await server.start()
	server.applyMiddleware({ app })

	httpServer.listen(process.env.PORT, () => {
		console.log(`Server listening on ${process.env.PORT}`)
		setupModels(sequelize)
		setupAssociations()
		setTimeout(() => {
			authenticateDatabase(sequelize)
		}, 500)
	})
}

startApolloServer()
