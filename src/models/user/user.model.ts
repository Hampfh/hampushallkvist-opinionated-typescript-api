import {
	IServiceCreationAttributes,
	ServiceModel
} from "models/user/service.model"
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
	services?: IServiceCreationAttributes[]
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

	declare readonly services?: ServiceModel[]
	declare readonly userTokens?: UserTokenModel[]

	declare static associations: {
		services: Association<UserModel, ServiceModel>
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
