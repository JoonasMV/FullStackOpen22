import Blog from "./Blog";
import Logout from "./Logout";

const Bloglist = (blogs, user) => {
  return (
    <div>
      <h2>blogs</h2>
      <p>{user} logged in <Logout /> </p>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default Bloglist;
