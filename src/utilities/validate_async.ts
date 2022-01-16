/**
 * XOR type defining a relationship
 * between data and error where one
 * is required but not at the same
 * time
 */
export type ValidateAsync<T> =
	| {
			data: T
			error?: never
	  }
	| {
			data?: never
			error: string
	  }

/**
 * A try catch method for performing a task
 * and check whether it succeeds or fails.
 * Then return an object properly formatting
 * the result.
 * More elegant solution than a regular try
 * catch as this also allows the use of
 * return values
 */
export async function validateAsync<T>(
	asyncFunction: () => Promise<T>
): Promise<ValidateAsync<T>> {
	try {
		return {
			data: await asyncFunction()
		}
	} catch (error) {
		if (process.env.NODE_ENV === "development") console.warn(error)
		return {
			error: error as string
		}
	}
}
