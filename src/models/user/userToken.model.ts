import { ITokenCreationAttributes, TokenModel } from "models/token/token.model"
import { IUserCreationAttributes, UserModel } from "models/user/user.model"
import { Association, DataTypes, Model, Optional, Sequelize } from "sequelize"

export interface IUserTokenAttributes {
	id: number
	userId: number
	tokenId: number
}
export interface IUserTokenCreationAttributes
	extends Optional<IUserTokenAttributes, "id"> {
	User?: IUserCreationAttributes
	Token?: ITokenCreationAttributes
}

export class UserTokenModel
	extends Model<IUserTokenAttributes, IUserTokenCreationAttributes>
	implements IUserTokenAttributes
{
	declare id: number
	declare userId: number
	declare tokenId: number

	// Timestamps
	declare readonly createdAt: Date
	declare readonly updatedAt: Date

	declare readonly User?: UserModel
	declare readonly Token?: TokenModel

	declare static associations: {
		User: Association<UserTokenModel, UserModel>
		Token: Association<UserTokenModel, TokenModel>
	}
}

export function buildUserTokenModel(sequelize: Sequelize) {
	UserTokenModel.init(
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
			tokenId: {
				allowNull: false,
				references: {
					model: "tokens",
					key: "id"
				},
				type: DataTypes.INTEGER
			}
		},
		{
			sequelize,
			tableName: "UserTokens",
			modelName: "UserTokens",
			schema: "users"
		}
	)
}
