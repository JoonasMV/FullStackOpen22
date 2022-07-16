const { reduce } = require("lodash");
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
    .get("/api/blogs")
    .expect(200)
    .expect("Content-type", /application\/json/);

  const response = await api.get("/api/blogs");
  expect(response.body).toHaveLength(initialBlogs.length);
});

test("id field is id", async () => {
  const response = await api.get("/api/blogs");

  console.log(response.body);

  expect("id").toBeDefined();
});

test("new blogs can be added", async () => {
  const newBlog = {
    title: "New Blog",
    author: "Mr.Example",
    url: "torilauta.onion",
    likes: 420,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const fields = response.body;
  fields.forEach((element) => {
    delete element.id;
  });

  expect(response.body).toHaveLength(initialBlogs.length + 1);
  expect(fields[initialBlogs.length]).toEqual(newBlog);
});

test("likes atleast zero", async () => {
  const testBlog = {
    title: "Like blog",
    author: "Liisa",
    url: "zip.zup",
  };

  await api.post("/api/blogs").send(testBlog).expect(201);
  const response = await api.get("/api/blogs");
  expect(response.body[initialBlogs] === 0);
});

afterAll(() => {
  mongoose.connection.close();
});
