import { useState } from "react"

const Blog = ({ blog, sendLike}) => {
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
    userSelect: "none"
  }

  const handleLike = () => {
    const updatedBlog = {
      likes: blog.likes +1,
      id: blog.id
    }
    sendLike(updatedBlog)
  }

  return (
    <div>
      <div style={blogStyle}>
        <div>
          <span style={linkStyle} onClick={() => setDetails(!details)}>
            {blog.title}</span> {blog.author}
        </div>
        {details && (
          <>
            <div>{blog.url}</div>
            <div>
              {blog.likes}
              <button onClick={handleLike}>like</button>
            </div>
            <div>{blog.user.name}</div>
          </>
        )}
      </div>
    </div>
  )
}

export default Blog
