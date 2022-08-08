const supertest = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blogModel");
const User = require("../models/userModel");
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
    console.log(newBlog);

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
      title: "test",
      author: "bob",
      url: "vvv",
    };

    await api.post("/api/blogs").send(newBlog);

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
    };

    await api.post("/api/blogs").send(noTitle).expect(400);

    const noUrl = {
      title: "test",
      author: "bob",
      likes: 3,
    };

    await api.post("/api/blogs").send(noUrl).expect(400);
  });

  test("blog deletion works", async () => {
    const response = await api.get("/api/blogs");
    const delId = response.body[0].id;
    await api.delete(`/api/blogs/${delId}`).expect(204);

    const newResponse = await api.get("/api/blogs");
    expect(newResponse.body.length).toBe(helper.initialBlogs.length - 1);
  });

  test("blog updation", async () => {
    const blogs = await helper.blogsInDb();
    const blogToUpdate = blogs[0];

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send({ likes: 123 })
      .expect(200);

    const blogsAtEnd = await helper.blogsInDb();
    const updatedBlog = blogsAtEnd[0];
    expect(updatedBlog.likes).toBe(123);
  });
});
//---------------------------------------------------------------//
describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });
});

describe("user api tests", () => {
  test("invalid users can't be created", async () => {
    const invalidUsername = {
      username: "GG",
      name: "Bobby",
      password: "Kissa123",
    };
    await api.post("/api/users").send(invalidUsername).expect(400);

    const invalidPassword = {
      username: "Bob",
      name: "Bobby",
      password: "ok",
    };
    await api.post("/api/users").send(invalidPassword).expect(400);

    const missingField = {
      username: "Bob",
      name: "Bobby",
    };
    await api.post("/api/users").send(missingField).expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
