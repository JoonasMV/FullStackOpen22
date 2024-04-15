const { Op } = require("sequelize");
const router = require("express").Router();
const { tokenExtractor } = require("../util/middleware");

const { Blog, User } = require("../models");


const blogFinder = async (req, res, next) => {
  console.log(req.params.id);
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res) => {
  let where = {};

  if (req.query.search) {
    where = {
      [Op.or]: [
        { title: { [Op.iLike]: `%${req.query.search}%` } },
        { author: { [Op.iLike]: `%${req.query.search}%` } },
      ],
    };
  }

  const blogs = await Blog.findAll({
    include: {
      model: User,
    },
    where,
    order: [["likes", "DESC"]]
  });
  return res.send(blogs);
});

router.post("/", tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id);
  const blog = await Blog.create({ ...req.body, userId: user.id });
  return res.json(blog);
});

router.put("/:id", blogFinder, async (req, res) => {
  const blog = req.blog;
  if (!blog) {
    return res.status(404).send({ error: "Blog not found" });
  }

  blog.likes++;
  await blog.save();
  return res.json({ likes: blog.likes });
});

router.delete("/:id", blogFinder, tokenExtractor, async (req, res) => {
  if (!(req.decodedToken.id === req.blog.userId)) {
    return res.sendStatus(403);
  }

  await req.blog.destroy();
  return res.sendStatus(200);
});

module.exports = router;
