import { buildTokenModel } from "models/token/token.model"
import { buildServiceModel } from "models/user/service.model"
import { buildUserModel } from "models/user/user.model"
import { buildUserTokenModel } from "models/user/userToken.model"
import { Sequelize } from "sequelize"

export function setupModels(sequelize: Sequelize) {
	buildTokenModel(sequelize)
	buildUserModel(sequelize)
	buildServiceModel(sequelize)
	buildUserTokenModel(sequelize)
}
