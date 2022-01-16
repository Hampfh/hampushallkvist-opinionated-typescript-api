import { mockUser } from "./user.mock"

describe("User tests", () => {
	it("Successfully creates a user", async () => {
		await mockUser()
		expect(true).toBeTruthy()
	})
})
