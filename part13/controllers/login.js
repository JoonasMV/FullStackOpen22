const jwt = require("jsonwebtoken");
const loginRouter = require("express").Router();

const { SECRET } = require("../util/config");
const User = require("../models/user");
const { Token } = require("../models");

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

  await Token.create({
    id: token
  })

  res.status(200).send({
    token,
    username: user.username,
    name: user.name,
  });
});

loginRouter.delete("/", async (req, res) => {
  console.log(req.token)
  const auth = req.get("Authorization")

  if (!(auth && auth.startsWith("bearer "))) {
    res.status(401).json({ error: "token error" })
  }

  const token = await Token.findByPk(auth.substring(7))
  await token.update({
    disabled: true
  })

  res.sendStatus(200)
})

module.exports = loginRouter;
