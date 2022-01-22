import { TokenModel } from "models/token/token.model"
import { ServiceModel } from "models/user/service.model"
import { UserModel } from "models/user/user.model"
import { UserTokenModel } from "models/user/userToken.model"

export function setupAssociations() {
	UserModel.hasMany(ServiceModel, {
		foreignKey: "userId",
		sourceKey: "id"
	})
	UserModel.hasMany(UserTokenModel, {
		foreignKey: "userId",
		sourceKey: "id"
	})

	ServiceModel.belongsTo(UserModel, {
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
