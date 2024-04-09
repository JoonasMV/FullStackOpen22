const jwt = require("jsonwebtoken");
const loginRouter = require("express").Router();

const { SECRET } = require("../util/config");
const User = require("../models/user");

loginRouter.post("/", async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });

  if (!(user && req.body.password === "salainen")) {
    return res.sendStatus(401);
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);

  res.status(200).send({
    token,
    username: user.username,
    name: user.name,
  });
});

module.exports = loginRouter;
