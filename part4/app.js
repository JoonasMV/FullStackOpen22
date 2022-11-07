const config = require("./utils/config")
const errorHandler = require("./utils/errorHandler")
const middleware = require("./utils/middleware")
const express = require("express")
require("express-async-errors")
const cors = require("cors")
const blogRouter = require("./controllers/blogRouter")
const userRouter = require("./controllers/userRouter")
const loginRouter = require("./controllers/login")
const app = express()
const mongoose = require("mongoose")

const mongoUrl = config.MONGO_URI
mongoose.connect(mongoUrl).then(console.log("connected to DB"))

app.use(express.json())
app.use(middleware.tokenExtractor)
app.use(express.static("build"))
app.use(cors())

app.use("/api/blogs", middleware.userExtractor, blogRouter)
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)

if (process.env.NODE_ENV === "test") {
  const testingRouter = require("./controllers/testRouter")
  app.use("/api/testing", testingRouter)
}

app.use(errorHandler)

module.exports = app
