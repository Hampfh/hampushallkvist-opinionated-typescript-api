describe("Environmental tests", () => {
	it("Has a port", () => {
		expect(process.env.PORT).toBeDefined()
	})

	it("Has database credentials", () => {
		expect(process.env.DB_HOST).toBeDefined()
		expect(process.env.DB_PORT).toBeDefined()
		expect(process.env.DB_NAME).toBeDefined()
		expect(process.env.DB_USER).toBeDefined()
		expect(process.env.DB_PASSWORD).toBeDefined()
	})

	it("Has an app name", () => {
		expect(process.env.APP_NAME).toBeDefined()
	})

	it("Has a JWT secret", () => {
		expect(process.env.JWT_SECRET).toBeDefined()
	})

	it("Has a default token size set", () => {
		expect(process.env.DEFAULT_TOKEN_LENGTH).toBeDefined()
	})
})
