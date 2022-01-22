import { IUserCreationAttributes, UserModel } from "models/user/user.model"
import { Association, DataTypes, Model, Optional, Sequelize } from "sequelize"

export interface IServiceAttributes {
	id: number
	userId: number
	service: string
	serviceUsername: string | null
	auth: string
}
export interface IServiceCreationAttributes
	extends Optional<IServiceAttributes, "id" | "userId"> {
	User?: IUserCreationAttributes
}

export class ServiceModel
	extends Model<IServiceAttributes, IServiceCreationAttributes>
	implements IServiceAttributes
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
		user: Association<ServiceModel, UserModel>
	}
}

export function buildServiceModel(sequelize: Sequelize) {
	ServiceModel.init(
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
			tableName: "Services",
			modelName: "services",
			schema: "users"
		}
	)
}
