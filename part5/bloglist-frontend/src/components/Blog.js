import { useState } from "react";
import LikeButton from "./LikeButton";

const Blog = ({ blog, updateLikes }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState([])
  const showAll = {display: visible ? "none" : "" }

  const toggleShown = () => {
    setVisible(!visible)    
  }
  //console.log(blog)
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <div style={showAll}>
        <div>{blog.url}</div>
        <div>Likes: {blog.likes} <LikeButton blog={blog} updateLikes={updateLikes} /></div>
        <div>{blog.user.name}</div>
      </div>
      <button onClick={toggleShown}>Show</button>
    </div>
  );
};

export default Blog;