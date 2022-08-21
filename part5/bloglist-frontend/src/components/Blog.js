import { useState } from "react";
import LikeButton from "./LikeButton";
import DeleteButton from "./DeleteButton";

const Blog = ({ blog, updateLikes, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState([])
  const showAll = {display: visible ? "none" : "" }

  let buttonText = "show"
  showAll.display === "" ? buttonText = "hide" : buttonText = "show"

  const toggleShown = () => {
    setVisible(!visible)    
  }
  //console.log(blog)
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleShown}>{buttonText}</button>
      <div style={showAll}>
        <div>{blog.url}</div>
        <div>Likes: {blog.likes} <LikeButton blog={blog} updateLikes={updateLikes} /></div>
        <div>{blog.user.name}</div>
        <div><DeleteButton blog={blog} deleteBlog={deleteBlog} /> </div>
      </div>
      
    </div>
  );
};

export default Blog;