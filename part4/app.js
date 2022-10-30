const config = require("./utils/config")
const express = require("express")
const cors = require("cors")
const blogRouter = require("./controllers/blogRouter")
const app = express()
const mongoose = require("mongoose")

const mongoUrl = config.MONGO_URI
mongoose.connect(mongoUrl)

app.use(express.json())
app.use(express.static("build"))
app.use(cors())

app.use("/api/blogs", blogRouter)

module.exports = app
