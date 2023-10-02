const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
  username: {
    type: String,
    required: true,
    minLength: 3,
  },
  name: String,
  passwordHash: String,
})

userSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id, delete ret.__v
    delete ret.passwordHash
  },
})

const User = mongoose.model("User", userSchema)

module.exports = User
