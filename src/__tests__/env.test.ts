describe("Environmental tests", () => {
	it("Has a port", () => {
		expect(process.env.PORT).toBeDefined()
	})

	it("Has database credentials", () => {
		expect(process.env.DB_HOST).toBeDefined()
		expect(process.env.DB_PORT).toBeDefined()
		expect(process.env.DB_NAME).toBeDefined()
	})

	it("Has an app name", () => {
		expect(process.env.APP_NAME).toBeDefined()
	})
})
