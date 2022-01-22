import { gql } from "apollo-server-core"

export const ServiceDefs = gql`
	type Service {
		id: ID!
		service: String!
		username: String!
		updatedAt: String
		createdAt: String
	}
`
