import { useState } from "react"
import PropTypes from "prop-types"
import { useDispatch } from "react-redux"
import { deleteBlog, updateBlog } from "../slices/blogSlice"

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const [details, setDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  const linkStyle = {
    cursor: "pointer",
    textDecoration: "underline",
    color: details ? "purple" : "blue",
    userSelect: "none",
  }

  const handleLike = () => {
    const updatedBlog = {
      likes: blog.likes + 1,
      id: blog.id,
    }
    dispatch(updateBlog(updatedBlog))
  }

  const handleDelete = (blogToDelete) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`))
      dispatch(deleteBlog(blogToDelete.id))
  }

  return (
    <div className="blog">
      <div style={blogStyle}>
        <div>
          <span style={linkStyle} onClick={() => setDetails(!details)}>
            {blog.title}
          </span>{" "}
          {blog.author}
        </div>
        {details && (
          <>
            <div>{blog.url}</div>
            <div>
              {blog.likes}
              <button onClick={handleLike}>like</button>
              {user.username === blog.user.username && (
                <button onClick={() => handleDelete(blog)}>delete</button>
              )}
            </div>
            <div>{blog.user.name}</div>
          </>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
}

export default Blog
