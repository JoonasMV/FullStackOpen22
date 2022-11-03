const blogRouter = require("express").Router()
const jwt = require("jsonwebtoken")
const { default: mongoose } = require("mongoose")
const { rawListeners } = require("../app")
const Blog = require("../models/blogModel")
const User = require("../models/userModel")

blogRouter.get("/", (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs)
  })
})

blogRouter.post("/", async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET)
  if (!req.token || !decodedToken.id) {
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
  const blog = await Blog.findById(req.params.id)
  if (!req.user) return res.sendStatus(401)

  if (blog.user.toString() === req.user.id) {
    const deletedBlog = await Blog.findByIdAndRemove(req.params.id)
    let filterblog = req.user.blogs
    console.log(filterblog)
    let newblogs = filterblog.filter(blog => blog.toString() !== deletedBlog._id.toString())
    console.log(newblogs)
    return res.sendStatus(204)
  }

  res.sendStatus(401)
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
