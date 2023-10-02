const blogRouter = require("express").Router()
const Blog = require("../models/blogModel")

blogRouter.get("/", (req, res) => {
  Blog.find({})
    .populate("user", ["username", "name"])
    .then((blogs) => {
      res.json(blogs)
    })
})

blogRouter.post("/", async (req, res, next) => {
  const user = req.user
  if (!user) {
    return res.status(401).json({ error: "wrong credentials" })
  }

  const newBlog = new Blog(req.body)
  newBlog.user = user

  const savedBlog = await newBlog.save()

  if (savedBlog) res.status(201).json(savedBlog)
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
})

blogRouter.delete("/:id", async (req, res) => {
  const user = req.user
  const blog = await Blog.findById(req.params.id)
  if (!user) return res.sendStatus(401)
  if (!blog) return res.sendStatus(204)

  if (user.id.toString() === blog.user.toString()) {
    await Blog.deleteOne({ _id: req.params.id })
    user.blogs = user.blogs.filter((blog) => blog.toString() !== req.params.id)
    await user.save()
    res.sendStatus(204)
  }
})

blogRouter.put("/:id", async (req, res) => {
  if (!req.user) return res.sendStatus(401)
  //const blogToUpdate = await Blog.findById(req.params.id)
  //if (!(req.user.id === blogToUpdate.user.toString())) return res.sendStatus(401)

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  }).populate("user", ["username", "name"])

  res.status(200).json(updatedBlog)
})

module.exports = blogRouter
