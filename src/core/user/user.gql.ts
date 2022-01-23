import { gql } from "apollo-server-core"

export const UserDefs = gql`
	type UserPrivate {
		id: ID!
		email: String!
		name: String
		surname: String
		services: [Service]
		createdAt: String!
		updatedAt: String!
	}

	type UserPublic {
		id: ID!
		createdAt: String!
		updatedAt: String!
	}

	type Query {
		me: UserPrivate
		user(id: ID!): UserPublic
	}
`
