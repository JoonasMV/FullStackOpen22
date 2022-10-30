const Blog = require("../models/blogModel")

const initialBlogs = [
  {
    title: "Jumping",
    author: "Bob",
    url: "url.fi",
    likes: 12,
  },
  {
    title: "Hopping",
    author: "Jenny",
    url: "wow.com",
    likes: 4,
  },
]

const blogsInDb = async () => {
  return await Blog.find({})
}

module.exports = { initialBlogs, blogsInDb }
