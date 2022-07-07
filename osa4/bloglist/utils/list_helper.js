const dummy = (blogs) => {
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
  const index = blogs.findIndex(object => {
    return object.likes === mostLikes;
  });
  return blogs[index];
};

module.exports = { dummy, totalLikes, favoriteBlog };
