const blogRouter = require("express").Router()
const Blog = require("../models/blogModel")

blogRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
})

blogRouter.post("/", (request, response, next) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then((result) => {
      response.status(201).json(result)
    })
    .catch(err => {
      response.status(400).json({ error: "error adding blog" })
    })
})

module.exports = blogRouter
