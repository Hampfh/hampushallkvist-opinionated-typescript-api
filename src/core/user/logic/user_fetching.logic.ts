import { IUser, UserModel } from "models/user.model"
import { FilterQuery } from "mongoose"

export async function getUser(filterQuery: FilterQuery<IUser>) {
	return await UserModel.findOne(filterQuery)
}

export async function getLeanUser(filterQuery: FilterQuery<IUser>) {
	return await UserModel.findOne(filterQuery).lean()
}
