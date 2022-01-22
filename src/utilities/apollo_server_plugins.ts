import {
	ApolloServerPluginDrainHttpServer,
	ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core"
import Http from "http"

export function buildGetApolloPlugins(httpServer: Http.Server) {
	if (process.env.NODE_ENV === "development") {
		return [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			ApolloServerPluginLandingPageGraphQLPlayground()
		]
	}
	return [ApolloServerPluginDrainHttpServer({ httpServer })]
}
