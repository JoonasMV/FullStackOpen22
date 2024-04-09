const router = require("express").Router()

const { Blog } = require("../models")

router.get("/", async (req, res) => {
  const blogs = await Blog.findAll()
  return res.send(blogs)
});

router.post("/", async (req, res) => {
  try {
    const blog = await Blog.create(req.body)
    return res.json(blog)
  } catch (error) {
    return res.status(400).json({ error })
  }
});

router.delete("/:id", async (req, res) => {
  await Blog.destroy({
    where: {
      id: req.params.id
    }
  })

  return res.sendStatus(200)
});

module.exports = router