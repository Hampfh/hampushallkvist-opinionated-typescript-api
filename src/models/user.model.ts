import mongoose, { Schema } from "mongoose"

export interface IUser {
	username: string
	hashedPassword: string
	createdAt: Date
	updatedAt: Date
}

export const UserSchema = new Schema(
	{
		username: {
			required: true,
			type: String
		},
		hashedPassword: {
			required: true,
			type: String
		}
	},
	{
		timestamps: true
	}
)

export const UserModel = mongoose.model<IUser>("user", UserSchema)
