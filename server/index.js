require("dotenv").config()
const express = require("express")
const cors = require("cors")
const path = require("path")
const fileUpload = require("express-fileupload")
const cookieParser = require("cookie-parser")

require("./models/models")
const sequelize = require("./db")
const router = require("./router")
const errorMiddleware = require("./middleware/errorMiddleware")

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(
	cors({
		credentials: true,
		origin: process.env.CLIENT_URL,
	})
)
app.use(express.static(path.resolve(__dirname, "static")))
app.use(cookieParser())
app.use(fileUpload({}))
app.use(`/api`, router)
app.use(errorMiddleware)

;(() => {
	try {
		sequelize.authenticate()
		sequelize.sync({ alter: true })
		app.listen(PORT, () =>
			console.log(`Server start and work at ${PORT} port...`)
		)
	} catch (err) {
		console.log(err)
	}
})()
