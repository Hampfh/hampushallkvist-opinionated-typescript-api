declare module "process" {
	global {
		const process: NodeJS.Process
		namespace NodeJS {
			interface ProcessEnv extends Dict<string> {
				NODE_ENV: string
				PORT: number
				APP_NAME: string

				DEFAULT_TOKEN_LENGTH: number
				JWT_SECRET: string

				DB_HOST: string
				DB_PORT: number
				DB_NAME: string
				DB_USER: string
				DB_PASSWORD: string
			}
		}
	}
}
