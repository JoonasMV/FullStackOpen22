const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const totalLikes = Object.values(blogs).reduce(
    (allLikes, {likes}) => allLikes + likes, 0
  );
  return totalLikes;
};

module.exports = { dummy, totalLikes };
