import { JwtPayload } from "jsonwebtoken"

declare global {
	interface IJwt extends JwtPayload {
		usr: string
	}
}
