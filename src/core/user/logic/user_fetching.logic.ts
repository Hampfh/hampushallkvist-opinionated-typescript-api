import { IUserAttributes, UserModel } from "models/user/user.model"
import { WhereOptions } from "sequelize"

export async function getUser(filterQuery: WhereOptions<IUserAttributes>) {
	return await UserModel.findOne({
		where: filterQuery
	})
}

export async function getUserRaw(filterQuery: WhereOptions<IUserAttributes>) {
	return await UserModel.findOne({
		where: filterQuery,
		raw: true
	})
}
