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
  const blogCount = lodash.countBy(blogs, "author")
  let topBlogger = { author: "", blogs: 0 }
  Object.keys(blogCount).forEach((author) => {
    if (topBlogger.blogs < blogCount[author]) {
      topBlogger = { author: author, blogs: blogCount[author] }
    }
  })
  return topBlogger
}

const mostLikes = (blogs) => {
  const mostLikedAll = lodash.groupBy(blogs, "likes")
  const mostLiked = Object.keys(mostLikedAll)
  let mostLikes = mostLiked[0]
  mostLiked.forEach((likes) => {
    if (Number(likes) > mostLikes) {
      mostLikes = Number(likes)
    }
  })
  const mostLikedBlog = {
    author: mostLikedAll[mostLikes][0].author,
    likes: mostLikedAll[mostLikes][0].likes,
  }
  return mostLikedBlog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
