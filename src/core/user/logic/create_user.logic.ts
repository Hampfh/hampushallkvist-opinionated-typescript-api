import Crypto from "crypto"
import { UserModel } from "models/user/user.model"
import { trycatch } from "utilities/validate_async"

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
	name: string | null,
	surname: string | null,
	email: string,
	password: string,
	service: string,
	alreadyVerified = false
) {
	const request = await UserModel.create(
		{
			email,
			name,
			surname,
			primaryService: null,
			services: [
				{
					service,
					serviceUsername: null,
					auth: await hashPassword(password),
					verified: alreadyVerified
				}
			]
		},
		{
			include: [
				{
					association: UserModel.associations.services
				}
			]
		}
	)

	// Connect the user to the created service
	if (request.services != null) {
		const primaryService = request.services[0].id
		await trycatch(async () =>
			UserModel.update(
				{
					primaryService
				},
				{
					where: {
						id: primaryService
					}
				}
			)
		)
	}

	return {
		id: request.id,
		email: request.email,
		services: request.services
	}
}
