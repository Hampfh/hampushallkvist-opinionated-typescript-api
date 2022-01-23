import { ApolloError } from "apollo-server-core"
import { GraphQLResolveInfo } from "graphql"
import { UserModel } from "models/user/user.model"
import { getRelevantDatabaseIncludes } from "utilities/get_relevant_database_includes"
import { trycatch } from "utilities/validate_async"

function getRequestSpecificParams(info: GraphQLResolveInfo) {
	const fetchPrivateUser = info.fieldName === "me"

	return { fetchPrivateUser }
}

export async function queryUser(
	parent: null,
	args: { id: string },
	context: unknown,
	info: GraphQLResolveInfo
): Promise<IPublicUser | null> {
	const { fetchPrivateUser } = getRequestSpecificParams(info)

	const userId = fetchPrivateUser ? 1 : args.id

	const associations = getRelevantDatabaseIncludes(info, "UserPrivate", {
		services: UserModel.associations.services
	})

	const result = await trycatch(() =>
		UserModel.findOne({
			raw: true,
			where: {
				id: userId
			},
			include: associations
		})
	)

	if (result.error != null) throw new ApolloError("Internal server error")
	if (result.data != null) return result.data

	return null
}
