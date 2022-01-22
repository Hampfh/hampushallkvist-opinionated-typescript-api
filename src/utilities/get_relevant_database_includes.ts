import { GraphQLResolveInfo } from "graphql"
import { parseResolveInfo, ResolveTree } from "graphql-parse-resolve-info"
import { Association, Model } from "sequelize"

type IIncludeType<M extends Model> = Record<string, Association<M, Model>>

function createAssociationObject(association: Association) {
	return {
		association
	}
}

/**
 * This function takes in a graphql info object and
 * a "mappings" object. If the fields specified in
 * the mappings object are present in the info request
 * object then that association related to the field
 * will be included in the returned association list
 * @param unparsedInfo Graphql info object
 * @param resolverName The name of the resolver
 * @param mappings A js object containing mappings
 * @returns A list of associations, this can be used when
 * performing requests to chain together tables
 */
export function getRelevantDatabaseIncludes<M extends Model>(
	unparsedInfo: GraphQLResolveInfo,
	resolverName: string,
	mappings:
		| IIncludeType<M>
		| {
				default: Association
		  }
) {
	const info = parseResolveInfo(unparsedInfo)

	const includeList =
		mappings.default == null
			? []
			: [createAssociationObject(mappings.default)]

	if (info == null) return includeList

	for (const key in mappings) {
		const infoField = info.fieldsByTypeName[resolverName] as {
			[str: string]: ResolveTree
		}
		if (infoField != null && infoField[key]) {
			includeList.push(
				createAssociationObject((mappings as IIncludeType<M>)[key])
			)
		}
	}

	return includeList
}
