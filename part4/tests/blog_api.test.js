const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blogModel");
const { request } = require("../app");

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
    const blogs = await api.get("/api/blogs");
    blogs.body.forEach((blog) => {
      expect(blog).toHaveProperty("id");
    });
  });

  test("blogs can be added", async () => {
    const newBlog = {
      title: "test",
      author: "penis :D",
      url: "www",
      likes: 420,
    };
    console.log(newBlog)

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await api.get("/api/blogs");
    expect(response.body.length).toBe(helper.initialBlogs.length + 1);
  });

  test("likes default to zero", async () => {
    const newBlog = {
      author: "bob",
    };

    await api
      .post("/api/blogs")
      .send(newBlog);

    const response = await api.get("/api/blogs");
    const blogs = response.body;
    console.log(response.body);
    expect(blogs[blogs.length - 1].likes).toBe(0);
  });

  test("required fields present", async () => {
    const noTitle = {
      author: "bob",
      url: "www",
      likes: 3,
    }

    await api
      .post("/api/blogs")
      .send(noTitle)
      .expect(400)

    const noUrl = {
      title: "test",
      author: "bob",
      likes: 3,
    }

    await api
    .post("/api/blogs")
    .send(noTitle)
    .expect(400)
  })

});

afterAll(() => {
  mongoose.connection.close();
});
