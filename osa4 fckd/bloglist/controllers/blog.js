const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

const { response } = require("express");
const { populate } = require("../models/user");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

blogRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog.toJSON());
  } else {
    response.status(404).end;
  }
});

blogRouter.post("/", async (request, response, next) => {
  const body = request.body


  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  console.log(body)

  const savedBlog = await blog.save()
  User.blogs = User.blogs.concat(savedBlog._id)
  await User.save()

  response.status(201).json(savedBlog)



  try {
    const savedBlog = await blog.save();
    user.notes = user.notes.concat(savedNote._id);
    await user.save();
    response.status(201).json(savedBlog);
  } catch (error) {
    next(error);
    response.status(400).end();
  }
});

blogRouter.delete("/:id", async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

blogRouter.put("/:id", async (request, response, next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true,
    });
    response.status(200).json(updatedBlog.toJSON());
  } catch (error) {
    next(error);
  }
});

module.exports = blogRouter;
