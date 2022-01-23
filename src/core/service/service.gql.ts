import { gql } from "apollo-server-core"

export const ServiceDefs = gql`
	type Service {
		id: ID!
		service: String!
		username: String
		verified: Boolean!
		updatedAt: String!
		createdAt: String!
	}
`
