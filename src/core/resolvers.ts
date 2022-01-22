import { queryPublicUser } from "core/user/query.resolver"

export const resolvers = {
	Query: {
		user: queryPublicUser
	}
}
