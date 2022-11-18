const userRouter = require("express").Router()
const bcrypt = require("bcrypt")
const User = require("../models/userModel")

userRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs")
  res.json(users)
})

userRouter.post("/", async (req, res) => {
  const body = req.body

  const duplicateUser = await User.findOne({ username: body.username })
  if (duplicateUser) {
    res.status(400).json({ error: "username already in use" })
    return
  }

  if (body.password.length < 3) {
    res.status(400).json({ error: "password must contain atleast 3 characters " })
    return
  }

  const passwordHash = await bcrypt.hash(body.password, 10)

  const newUser = new User({
    username: body.username,
    name: body.name,
    passwordHash: passwordHash,
  })

  const savedUser = await newUser.save()

  res.status(201).json(savedUser)
})

userRouter.delete("/", async (req, res) => {
  await User.deleteMany({})
  res.sendStatus(204)
})

module.exports = userRouter
