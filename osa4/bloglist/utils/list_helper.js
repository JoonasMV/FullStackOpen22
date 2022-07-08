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

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];
const mostBlogs = () => {
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
mostBlogs();

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
