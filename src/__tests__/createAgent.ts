import { default as request } from "supertest"
import app from "../app.setup"

export function mockAgent() {
	return request.agent(app)
}
