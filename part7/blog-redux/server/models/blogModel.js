const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
  url: String,
  title: {
    type: String,
    required: [true, "title required"],
    minLength: 1
  },
  author: {
    type: String,
    required: [true, "author required"],
    minLength: 1
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: [
    {
      type: String,
      minLength: 1,
      required: [true, "content required"]
    }
  ]
})

blogSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id, delete ret.__v
  },
})

const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog
