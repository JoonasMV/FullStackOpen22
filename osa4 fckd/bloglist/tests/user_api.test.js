const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("user creation works", async () => {
    const test = await api.get("/api/users");
    console.log(test);
    const validUser = {
      username: "Example",
      name: "max",
      password: "pass",
    };

    const result = api
      .post("/api/users")
      .send(validUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  test("password present", async () => {
    const invalidUser = new User({
      username: "asd",
      name: "asd",
    });

    const result = await api.post("/api/users")
      .send(invalidUser)
      .expect(400);

    expect(result.body.error).toContain("password required");
  });

  test("username present", async () => {
    const invalidUser = new User({
      name: "asd",
      password: "foo",
    });

    const result = await api
      .post("/api/users")
      .send(invalidUser).expect(400);

    expect(result.body.error).toContain("username and password required");
  });

  test("password longer than 3 characters", async () => {
    const invalidPassword = {
      username: "Example",
      name: "max",
      password: "uf",
    };

    const result = await api.post("/api/users")
      .send(invalidPassword)
      .expect(400);

    expect(result.body.error).toContain("username/ password has to be atleast 3 characters long")
  });

  test("username longer than 3 characters", async () => {
    const invalidUsername = {
      username: "Nu",
      name: "max",
      password: "powpow",
    };

    const result = await api.post("/api/users")
      .send(invalidUsername)
      .expect(400);

    expect(result.body.error).toContain("username/ password has to be atleast 3 characters long")
  });

});
