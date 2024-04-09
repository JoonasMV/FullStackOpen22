const router = require("express").Router()

const { Blog } = require("../models")

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id)
  next()
}

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll()
  return res.send(blogs)
});

router.post("/", async (req, res) => {
    const blog = await Blog.create(req.body)
    return res.json(blog)
});

router.put("/:id", blogFinder, async (req, res) => {
  const blog = req.blog
  if (!blog) {
    return res.status(404).send({ error: "Blog not found" })
  }

    blog.likes++
    await blog.save()
    return res.json({ likes: blog.likes })
  }
)

router.delete("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy()
  }
  return res.sendStatus(200)
});

module.exports = router