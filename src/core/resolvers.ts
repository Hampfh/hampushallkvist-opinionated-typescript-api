import { queryServices } from "core/service/query.resolver"
import { queryUser } from "core/user/query.resolver"

export const resolvers = {
	Query: {
		me: queryUser,
		user: queryUser
	},
	UserPrivate: {
		services: queryServices
	}
}
