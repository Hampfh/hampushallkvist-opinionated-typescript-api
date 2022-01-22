import { ApolloError } from "apollo-server-core"
import { getUserRaw } from "core/user/logic/user_fetching.logic"
import { selectFields } from "field-modifier"
import { trycatch } from "utilities/validate_async"

export async function queryPublicUser(
	parent: null,
	data: { id: string }
): Promise<IPublicUser | null> {
	const result = await trycatch(() =>
		getUserRaw({
			id: data.id
		})
	)

	if (result.error != null) throw new ApolloError("Internal server error")

	if (result.data != null) {
		return selectFields(["id", "username", "email"], result.data)
	}

	return null
}
