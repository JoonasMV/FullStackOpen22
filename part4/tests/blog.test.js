const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blogModel")
const helper = require("./test_helper")

beforeEach(async () => {
  //console.log(helper.blogsInDb())
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe("blogs in right format", () => {
  test("right amount of JSON blogs", async () => {
    const blogsAtStart = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/)

    expect(blogsAtStart.body).toHaveLength(helper.initialBlogs.length)
  })
})

test("id is id", async () => {
  const response = await api.get("/api/blogs")
  expect(response.body[0].id).toBeDefined()
  expect(response.body[0]._id).not.toBeDefined()
})

describe("posting new blog", () => {
  const newBlog = {
    title: "Swimming",
    author: "James",
    url: "swim.co.uk",
    likes: 7,
  }
  test("blog can be added", async () => {
    await api.post("/api/blogs")
      .send(newBlog)
      .expect("Content-Type", /json/)
      .expect(201)
      .then(res => {
        newBlog.id = res.body.id
        expect(res.body).toStrictEqual(newBlog)
      })
  })

  test("db size increases", async () => {
    await api.post("/api/blogs").send(newBlog)
    const result = await api.get("/api/blogs")
    expect(result.body.length).toBe(helper.initialBlogs.length + 1)
  })

  test("likes default to zero", async () => {
    const noLikes = {
      title: "Skiing",
      author: "Bob",
      url: "ice.cool",
    }

    await api.post("/api/blogs")
      .send(noLikes)
      .then(res => {
        expect(res.body.likes).toBeDefined()
        expect(res.body.likes).toBe(0)
      })
  })

  test("title and url required", async () => {
    const invBlog = {
      likes: 0
    }

    await api.post("/api/blogs").send(invBlog).expect(400)
  })
})

describe("blog deletion", () => {
  test("deletion works", async () => {
    const blogs = await api.get("/api/blogs")
    const idToDelete = blogs.body[0].id
    await api.delete(`/api/blogs/${idToDelete}`).expect(204)
  })

  test("blog amount decreases", async () => {
    const blogs = await api.get("/api/blogs")
    await api.delete(`/api/blogs/${blogs.body[0].id}`)
    const blogsAtEnd = await api.get("/api/blogs")
    expect(blogsAtEnd.body.length).toBe(helper.initialBlogs.length - 1)
  })
})

describe("blog updation", () => {
  test("values update", async () => {
    const blogs = await api.get("/api/blogs")
    const blogId = blogs.body[0].id

    await api.put(`/api/blogs/${blogId}`).send({ likes: 123 })
    const updatedBlogs = await api.get("/api/blogs")
    expect(updatedBlogs.body[0].likes).toBe(123)
  })

})