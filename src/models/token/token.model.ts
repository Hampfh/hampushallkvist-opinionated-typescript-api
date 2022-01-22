import {
	IUserTokenCreationAttributes,
	UserTokenModel
} from "models/user/userToken.model"
import { Association, DataTypes, Model, Optional, Sequelize } from "sequelize"

export interface ITokenAttributes {
	id: number
	token: string
	expires: Date
	type: "REFRESH"
}
export interface ITokenCreationAttributes
	extends Optional<ITokenAttributes, "id"> {
	UserTokens?: IUserTokenCreationAttributes[]
}

export class TokenModel
	extends Model<ITokenAttributes, ITokenCreationAttributes>
	implements ITokenAttributes
{
	declare id: number
	declare token: string
	declare expires: Date
	declare type: "REFRESH"

	// Timestamps
	declare readonly createdAt: Date
	declare readonly updatedAt: Date

	declare readonly userTokens?: UserTokenModel[]

	declare static associations: {
		userTokens: Association<TokenModel, UserTokenModel>
	}
}

export function buildTokenModel(sequelize: Sequelize) {
	TokenModel.init(
		{
			id: {
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
				type: DataTypes.INTEGER
			},
			token: {
				allowNull: false,
				type: DataTypes.STRING
			},
			expires: {
				allowNull: false,
				type: DataTypes.DATE
			},
			type: {
				allowNull: false,
				type: DataTypes.ENUM("REFRESH")
			}
		},
		{
			sequelize,
			tableName: "Tokens",
			modelName: "tokens",
			schema: "public"
		}
	)
}
