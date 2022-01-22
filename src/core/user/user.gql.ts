import { gql } from "apollo-server-core"

export const UserDefs = gql`
	type UserPrivate {
		id: ID!
		email: String!
		services: [Service]
	}

	type UserPublic {
		id: ID!
		email: String!
	}

	type Query {
		me: UserPrivate
		user(id: ID!): UserPublic
	}
`
