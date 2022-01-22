import {
	IUserAuthCreationAttributes,
	UserAuthModel
} from "models/user/userAuth.model"
import {
	IUserTokenCreationAttributes,
	UserTokenModel
} from "models/user/userToken.model"
import { Association, DataTypes, Model, Optional, Sequelize } from "sequelize"

export interface IUserAttributes {
	id: number
	email: string
}
export interface IUserCreationAttributes
	extends Optional<IUserAttributes, "id"> {
	userAuths?: IUserAuthCreationAttributes[]
	userTokens?: IUserTokenCreationAttributes[]
}

export class UserModel
	extends Model<IUserAttributes, IUserCreationAttributes>
	implements IUserAttributes
{
	declare id: number
	declare email: string

	// Timestamps
	declare readonly createdAt: Date
	declare readonly updatedAt: Date

	declare readonly userAuths?: UserAuthModel[]
	declare readonly userTokens?: UserTokenModel[]

	declare static associations: {
		userAuths: Association<UserModel, UserAuthModel>
		userTokens: Association<UserModel, UserTokenModel>
	}
}

export function buildUserModel(sequelize: Sequelize) {
	UserModel.init(
		{
			id: {
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
				type: DataTypes.INTEGER
			},
			email: {
				allowNull: false,
				type: DataTypes.STRING
			}
		},
		{
			sequelize,
			tableName: "Users",
			modelName: "users",
			schema: "users"
		}
	)
}
