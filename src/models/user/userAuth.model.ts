import { IUserCreationAttributes, UserModel } from "models/user/user.model"
import { Association, DataTypes, Model, Optional, Sequelize } from "sequelize"

export interface IUserAuthAttributes {
	id: number
	userId: number
	service: string
	serviceUsername: string | null
	auth: string
}
export interface IUserAuthCreationAttributes
	extends Optional<IUserAuthAttributes, "id" | "userId"> {
	User?: IUserCreationAttributes
}

export class UserAuthModel
	extends Model<IUserAuthAttributes, IUserAuthCreationAttributes>
	implements IUserAuthAttributes
{
	declare id: number
	declare userId: number
	declare service: string
	declare serviceUsername: string | null
	declare auth: string

	// Timestamps
	declare readonly createdAt: Date
	declare readonly updatedAt: Date

	declare readonly user?: UserModel

	declare static associations: {
		user: Association<UserAuthModel, UserModel>
	}
}

export function buildUserAuthModel(sequelize: Sequelize) {
	UserAuthModel.init(
		{
			id: {
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
				type: DataTypes.INTEGER
			},
			userId: {
				allowNull: false,
				references: {
					model: "users",
					key: "id"
				},
				type: DataTypes.INTEGER
			},
			service: {
				allowNull: false,
				type: DataTypes.STRING
			},
			serviceUsername: {
				allowNull: true,
				type: DataTypes.STRING
			},
			auth: {
				allowNull: false,
				type: DataTypes.STRING
			}
		},
		{
			sequelize,
			tableName: "UserAuths",
			modelName: "userAuths",
			schema: "users"
		}
	)
}
