interface IUser extends IDbModel {
	email: string
}

interface IPrivateUser extends IUser {
	services?: IService[]
	userTokens?: IUserToken[]
}

type IPublicUser = IUser

interface IService extends IDbModel {
	service: string
	serviceUsername?: string
	auth: string
}

interface IUserToken extends IDbModel {
	userId: number
	tokenId: number
}
