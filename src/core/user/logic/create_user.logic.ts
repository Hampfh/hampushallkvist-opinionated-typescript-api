import Crypto from "crypto"
import { UserModel } from "models/user/user.model"

async function hashPassword(password: string) {
	return new Promise<string>((resolve, reject) => {
		const salt = Crypto.randomBytes(16).toString("hex")

		Crypto.scrypt(password, salt, 64, (err, derivedKey) => {
			if (err) reject(err)
			resolve(salt + ":" + derivedKey.toString("hex"))
		})
	})
}

export async function createUser(
	username: string | undefined,
	email: string,
	password: string,
	service: string
) {
	const request = await UserModel.create(
		{
			email,
			userAuths: [
				{
					service,
					serviceUsername: username ?? null,
					auth: await hashPassword(password)
				}
			]
		},
		{
			include: [
				{
					association: UserModel.associations.userAuths
				}
			]
		}
	)

	return {
		id: request.id,
		email: request.email,
		usernames: request.userAuths
	}
}
