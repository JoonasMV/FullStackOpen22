const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const User = require("../models/userModel")
const api = supertest(app)
const user = require("../models/userModel")
const helper = require("./test_helper")

beforeEach( async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

describe("adding new users", () => {
  test("users get added", async () => {
    const newUser = {
      username: "Gurt",
      name: "Gus",
      password: "gusGang"
    }

    await api.post("/api/users")
      .send(newUser)
      .expect(201)

    const result = await api.get("/api/users")
    expect(result.body.length).toBe(helper.initialUsers.length + 1)
  })

  test("malformatted user can't be added", async () => {
    const invUser = {
      username: "no",
      name: "error",
      password: "gg"
    }

    const res = await api.post("/api/users")
      .send(invUser)
      .expect(400)

    expect(res.body.error).toBeDefined()
  })
})