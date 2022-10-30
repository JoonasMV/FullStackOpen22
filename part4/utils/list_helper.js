const lodash = require("lodash")

const dummy = (array) => 1

const totalLikes = (arr) => {
  let sum = 0
  arr.forEach((element) => {
    sum += element.likes
  })
  return sum
}

const favoriteBlog = (blogs) => {
  let fBlog = blogs[0]
  blogs.forEach((blog) => {
    if (blog.likes > fBlog.likes) fBlog = blog
  })
  return fBlog
}

const mostBlogs = (blogs) => {
  const authors = lodash.countBy(blogs, "author")
  let mostBlogs = { author: "asd", blogs : 0 }
  Object.keys(authors).forEach((blog) => {
    if (authors[blog] > mostBlogs.blogs) {
      mostBlogs = { author: blog, blogs: authors[blog] }
    }
  })
  return mostBlogs
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
