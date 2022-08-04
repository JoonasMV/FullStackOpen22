const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!(username && password)) {
    return response.status(400).json({
      error: "username and password required",
    });
  }

  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: "username/ password has to be atleast 3 characters long"
    })
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return response.status(400).json({
      error: "username must be unique",
    });
  }

  if (password === undefined) {
    return response.status(400).json({
      error: "password required",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  console.log(user);

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

module.exports = usersRouter;
