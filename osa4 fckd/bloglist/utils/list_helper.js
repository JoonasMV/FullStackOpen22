const _ = require("lodash");

const dummy = () => {
  return 1;
};

const totalLikes = (blogs) => {
  const totalLikes = Object.values(blogs).reduce(
    (allLikes, { likes }) => allLikes + likes,
    0
  );
  return totalLikes;
};

const favoriteBlog = (blogs) => {
  const mostLikes = Math.max(...blogs.map((blog) => blog.likes));
  const index = blogs.findIndex((object) => {
    return object.likes === mostLikes;
  });
  const favBlog = blogs[index];
  ["_id", "__v", "url"].forEach((e) => delete favBlog[e]);
  return favBlog;
};


const mostBlogs = (blogs) => {
  let authors = blogs.map((b) => b.author);
  authors = _.intersection(authors);

  let authorWithMostBlogs = {author: "", blogs: 0};
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
      authorWithMostBlogs = {author: blogAuthor, blogs: mostBlogs};
    }
    compBlogs = 0;
  });
  return authorWithMostBlogs;
};

const mostLikes = (blogs) => {
  let authors = blogs.map((b) => b.author);
  authors = _.intersection(authors);

  let mostLikedAuthor = {author: "", likes: 0};
  authors.forEach(blogAuthor => {
    let blogLikes = 0;
    blogs.forEach(blog => {
      if (blog.author === blogAuthor) {
        blogLikes += blog.likes;
      }
    });
    if (mostLikedAuthor.likes < blogLikes) {
      mostLikedAuthor = {author: blogAuthor, likes: blogLikes};
    }
  });
  return mostLikedAuthor;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
