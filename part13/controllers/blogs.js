const { Op } = require("sequelize");
const router = require("express").Router();
const jwt = require("jsonwebtoken");

const { Blog, User } = require("../models");

const { SECRET } = require("../util/config");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      console.log(authorization.substring(7));
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

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
