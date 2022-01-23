import { emailExists, validateEmail } from "core/user/logic/email.logic"
import { IUserCreationAttributes } from "models/user/user.model"

export async function newUserIsValid(
	newUser: Partial<IUserCreationAttributes>
): Promise<{ valid: boolean; error?: string }> {
	if (newUser.email == null)
		return { valid: false, error: "No email was provided" }

	if (!validateEmail(newUser.email))
		return { valid: false, error: "Invalid email address" }
	if (await emailExists(newUser.email))
		return { valid: false, error: "A user with that email already exists" }

	return { valid: true, error: undefined }
}
