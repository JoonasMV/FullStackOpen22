const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  url: String,
  likes: {
    type: Number,
    default: 0
  },
})

blogSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id, delete ret.__v
  },
})

const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog
