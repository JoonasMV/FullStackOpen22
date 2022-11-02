const config = require("./utils/config")
const errorHandler = require("./utils/errorHandler")
const express = require("express")
require("express-async-errors")
const cors = require("cors")
const blogRouter = require("./controllers/blogRouter")
const userRouter = require("./controllers/userRouter")
const app = express()
const mongoose = require("mongoose")

const mongoUrl = config.MONGO_URI
mongoose.connect(mongoUrl).then(console.log("connected to DB"))

app.use(express.json())
app.use(express.static("build"))
app.use(cors())

app.use("/api/blogs", blogRouter)
app.use("/api/users", userRouter)

app.use(errorHandler)

module.exports = app
