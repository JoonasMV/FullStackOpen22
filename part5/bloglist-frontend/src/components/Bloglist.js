const Bloglist = (blogs, user, Blog) => {
  return (
    <div>
      <h2>blogs</h2>
      <p>{user} logged in</p>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Bloglist;
