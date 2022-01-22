import { ApolloError } from "apollo-server-core"
import { replaceFields } from "field-modifier"
import { ServiceModel } from "models/user/service.model"
import { trycatch } from "utilities/validate_async"

export async function queryServices(
	parent: { id?: number },
	args: { id: string }
): Promise<IService[] | null> {
	const fetchId = parent.id ?? args.id

	const result = await trycatch(() =>
		ServiceModel.findAll({
			raw: true,
			where: {
				userId: fetchId
			}
		})
	)

	if (result.error != null) throw new ApolloError("Internal server error")
	if (result.data != null) {
		return replaceFields(
			{
				serviceUsername: "username"
			},
			result.data
		)
	}

	return null
}
