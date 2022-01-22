import { buildTokenModel } from "models/token/token.model"
import { buildUserModel } from "models/user/user.model"
import { buildUserAuthModel } from "models/user/userAuth.model"
import { buildUserTokenModel } from "models/user/userToken.model"
import { Sequelize } from "sequelize"

export function setupModels(sequelize: Sequelize) {
	buildTokenModel(sequelize)
	buildUserModel(sequelize)
	buildUserAuthModel(sequelize)
	buildUserTokenModel(sequelize)
}
