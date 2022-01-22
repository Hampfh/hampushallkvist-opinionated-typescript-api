import { TokenModel } from "models/token/token.model"
import { UserModel } from "models/user/user.model"
import { UserAuthModel } from "models/user/userAuth.model"
import { UserTokenModel } from "models/user/userToken.model"

export function setupAssociations() {
	UserModel.hasMany(UserAuthModel, {
		foreignKey: "userId",
		sourceKey: "id"
	})
	UserModel.hasMany(UserTokenModel, {
		foreignKey: "userId",
		sourceKey: "id"
	})

	UserAuthModel.belongsTo(UserModel, {
		foreignKey: "userId",
		targetKey: "id"
	})

	UserTokenModel.belongsTo(UserModel, {
		foreignKey: "userId",
		targetKey: "id"
	})
	UserTokenModel.belongsTo(TokenModel, {
		foreignKey: "tokenId",
		targetKey: "id"
	})

	TokenModel.hasOne(UserTokenModel, {
		foreignKey: "tokenId",
		sourceKey: "id"
	})
}
