const mongoose = require("mongoose");
const supertest = require("supertest");
const { response } = require("../app");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "New post",
    author: "Bob Jones",
    url: "www.example.com",
    likes: 69,
  },
  {
    title: "Blogsy",
    author: "Michael Reeves",
    url: "www.humphumo.xyz",
    likes: 12,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("there are two JSON blogs", async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect("Content-type", /application\/json/);

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length)
});


afterAll(() => {
  mongoose.connection.close();
});
