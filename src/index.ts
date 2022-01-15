import { connectDatabase } from "models/db.init"
import app from "./app.setup"

app.listen(process.env.PORT, () => {
	console.log(`Server listening on ${process.env.PORT}`)
	connectDatabase()
})
