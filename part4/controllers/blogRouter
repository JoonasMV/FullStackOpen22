const config = require("../utils/config");
const blogRouter = require("express").Router();
const logger = require("../utils/logger");
const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end;
  }
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;
  const token = request.token;
  const user = request.user;

  const decodedToken = jwt.verify(token, config.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog.toJSON());
});

blogRouter.delete("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  const token = request.token;
  const user = request.user;
  if (!token || !blog) {
    return response
      .status(401)
      .json({ error: "token or blog missing or invalid" });
  }

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(blog);
    response.status(204).end();
  } else {
    response.status(403).json({ error: "unauthorized action" });
  }
});

blogRouter.put("/:id", async (request, response) => {
  const blog = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });
  logger.info(updatedBlog);
  if (updatedBlog) {
    response.status(200).json(updatedBlog.toJSON());
  } else {
    response.status(400).end();
  }
});

module.exports = blogRouter;
