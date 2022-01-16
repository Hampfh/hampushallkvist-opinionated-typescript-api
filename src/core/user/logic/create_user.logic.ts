import Crypto from "crypto"
import { UserModel } from "models/user.model"

async function hashPassword(password: string) {
	return new Promise((resolve, reject) => {
		const salt = Crypto.randomBytes(16).toString("hex")

		Crypto.scrypt(password, salt, 64, (err, derivedKey) => {
			if (err) reject(err)
			resolve(salt + ":" + derivedKey.toString("hex"))
		})
	})
}

export async function createUser(username: string, password: string) {
	return new UserModel({
		username,
		hashedPassword: await hashPassword(password)
	})
}
