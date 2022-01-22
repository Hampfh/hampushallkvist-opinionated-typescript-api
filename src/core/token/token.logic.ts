import Crypto from "crypto"

export function generateToken(tokenLength?: number) {
	return Crypto.randomBytes(
		(tokenLength ??
			parseInt(
				process.env.DEFAULT_TOKEN_LENGTH as unknown as string,
				10
			)) / 2
	).toString("hex")
}
