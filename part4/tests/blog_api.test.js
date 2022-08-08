const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blogModel");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("blog api tests", () => {
  test("GET returns right amount of blogs", async () => {
    const blogs = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(blogs.body).toHaveLength(helper.initialBlogs.length);
  });

  test("id field is id", async () => {
    const blogs = await api.get("/api/blogs")
    console.log(blogs.body)
    blogs.body.forEach(blog => {
      expect(blog).toHaveProperty("id")
    });
  })

  
});


afterAll(() => {
  mongoose.connection.close();
});
