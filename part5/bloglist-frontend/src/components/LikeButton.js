const LikeButton = ({ blog, updateLikes }) => {
  const addLike = () => {
    //console.log(blog)
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      name: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };

    updateLikes(blog.id, updatedBlog)
  };

  return <button onClick={addLike}>Like</button>
};

export default LikeButton;
