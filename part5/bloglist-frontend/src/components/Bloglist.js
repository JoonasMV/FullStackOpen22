import Blog from "./Blog";
import Logout from "./Logout";

const Bloglist = ({blogs, username, updateLikes, deleteBlog}) => {
  return (
    <div>
      <h2>blogs</h2>
      <p>{username} logged in <Logout /> </p>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog} />
      ))}
    </div>
  );
};

export default Bloglist;
