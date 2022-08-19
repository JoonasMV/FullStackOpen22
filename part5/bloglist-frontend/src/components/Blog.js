import { useReducer, useState } from "react";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState([])

  const showMin = {display: visible ? "none" : "" }
  const showInfo = { display: visible ? "" : "none" }

  const toggleShown = () => {
    setVisible(!visible)    
  }
  console.log(blog)
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <div style={showMin}>
        <div>{blog.url}</div>
        <div>Likes: {blog.likes} <button>Like</button></div>
        <div>{blog.user.name}</div>
      </div>
      <button onClick={toggleShown}>Show</button>
    </div>
  );
};

export default Blog;