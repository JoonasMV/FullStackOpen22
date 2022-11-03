const blogRouter = require("express").Router()
const jwt = require("jsonwebtoken")
const { default: mongoose } = require("mongoose")
const Blog = require("../models/blogModel")
const User = require("../models/userModel")

blogRouter.get("/", (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs)
  })
})

const getTokenFrom = (req) => {
  const authorization = req.get("authorization")
  console.log(req.get("authorization"))
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.post("/", async (req, res, next) => {
  const token = getTokenFrom(req)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" })
  }

  const user = await User.findById(decodedToken.id)
  const newBlog = new Blog(req.body)
  newBlog.user = user

  const savedBlog = await newBlog.save()

  if(savedBlog) res.status(201).json(savedBlog)
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
})

blogRouter.delete("/:id", async (req, res) => {
  try {
    await Blog.findByIdAndRemove(req.params.id)
    res.sendStatus(204)
  } catch {
    res.status(500).json({ error: "error deleting blog" })
  }
})

blogRouter.delete("/", async (req, res) => {
  await Blog.deleteMany({})
  res.sendStatus(204)
})

blogRouter.put("/:id", async (req, res) => {
  try {
    const updatedBlog = await Blog
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .setOptions({ runValidators: true })
    res.status(200).json(updatedBlog)
  } catch (e) {
    res.status(400).json({ error: "error when updating blog" })
  }
})

module.exports = blogRouter
