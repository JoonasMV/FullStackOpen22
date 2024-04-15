const userRouter = require("express").Router();

const { User, Blog } = require("../models");

userRouter.get("/", async (req, res) => {
  let where = {}

  if (req.query.read) {
    where = {
      read: req.query.read
    }
  }

  const users = await User.findAll({
    include: [
      {
        model: Blog,
        as: "readings",
        attributes: {
          exclude: ["createdAt", "updatedAt", "userId"]
        },
        through: {
          where,
          attributes: ["id", "read"],
        },
      },
    ],
  });
  res.json(users);
});

userRouter.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: ["name", "username"],
    include: [
      {
        model: Blog,
        as: "readings",
        through: { attributes: ["id", "read"] },
        attributes: { exclude: ["createdAt", "updatedAt", "userId"] },
      },
    ],
  });
  res.json(user);
});

userRouter.post("/", async (req, res) => {
  const user = req.body;
  user.password = "salainen";
  const createdUser = await User.create(user);
  return res.json(createdUser);
});

userRouter.put("/:username", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });
  user.username = req.body.username;
  const updatedUser = await user.save();
  return res.send(updatedUser);
});

module.exports = userRouter;
