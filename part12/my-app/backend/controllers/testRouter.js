const testRouter = require("express").Router()
const Blog = require("../models/blogModel")
const User = require("../models/userModel")

testRouter.post("/reset", async (req, res) => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  res.sendStatus(204)
})

module.exports = testRouter