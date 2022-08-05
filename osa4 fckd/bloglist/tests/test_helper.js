const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "New post",
    author: "Bob Jones",
    url: "www.example.com",
    likes: 69,
    id: "62d45068aaa19c7bd8c7fbdf",
  },
  {
    title: "Blogsy",
    author: "Michael Reeves",
    url: "www.humphumo.xyz",
    likes: 12,
    id: "62e487c4fab610fe7eb57b05",
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return Blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
};
