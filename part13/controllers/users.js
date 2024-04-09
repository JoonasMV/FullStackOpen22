const userRouter = require("express").Router();

const { User, Blog } = require("../models");

userRouter.get("/", async (req, res) => {
  const users = await User.findAll({
    include: Blog,
  });
  res.json(users);
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
