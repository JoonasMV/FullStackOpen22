const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let totalLikes = 0;
  blogs.forEach((blog) => {
    totalLikes += blog.likes;
  });
  return totalLikes;
};

const favoriteBlog = (blogs) => {
  let favoriteBlog = blogs[0];
  blogs.forEach((blog) => {
    if (blog.likes > favoriteBlog.likes) {
      favoriteBlog = blog;
    }
  });
  return favoriteBlog;
};

const mostBlogs = (blogs) => {
  let authors = blogs.map((b) => b.author);
  authors = _.intersection(authors);

  let authorWithMostBlogs = { author: "", blogs: 0 };
  let compBlogs = 0;
  let mostBlogs = 0;
  authors.forEach((blogAuthor) => {
    blogs.forEach((blog) => {
      if (blog.author === blogAuthor) {
        compBlogs++;
      }
      compBlogs;
    });
    if (compBlogs > mostBlogs) {
      mostBlogs = compBlogs;
      authorWithMostBlogs = { author: blogAuthor, blogs: mostBlogs };
    }
    compBlogs = 0;
  });
  return authorWithMostBlogs;
};

const mostLikes = (blogs) => {
  let authors = blogs.map((b) => b.author);
  authors = _.intersection(authors);

  let mostLikedAuthor = { author: "", likes: 0 };
  authors.forEach((blogAuthor) => {
    let blogLikes = 0;
    blogs.forEach((blog) => {
      if (blog.author === blogAuthor) {
        blogLikes += blog.likes;
      }
    });
    if (mostLikedAuthor.likes < blogLikes) {
      mostLikedAuthor = { author: blogAuthor, likes: blogLikes };
    }
  });
  return mostLikedAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
