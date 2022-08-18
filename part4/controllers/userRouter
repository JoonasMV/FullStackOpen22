const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/userModel");

userRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });

  response.json(users);
});

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!username) {
    return response.status(400).send({ error: "username required" });
  }
  if (username.length < 3) {
    return response
      .status(400)
      .send({ error: "username must be 3 characters or longer" });
  }

  if (!password) {
    return response.status(400).send({ error: "password required" });
  }
  if (password.length < 3) {
    return response
      .status(400)
      .send({ error: "password must be 3 characters or longer" });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = userRouter;
