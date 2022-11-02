const Blog = require("../models/blogModel")
const User = require("../models/userModel")

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

const initialUsers = [
  {
    username: "JamesTheMan",
    name: "James",
    password: "Jammies",
  },
  {
    username: "JennyTheLady",
    name: "Jenny",
    password: "Jumpy",
  },
]

const usersInDb = async () => {
  return await User.find({})
}

module.exports = { initialBlogs, blogsInDb, initialUsers, usersInDb }
