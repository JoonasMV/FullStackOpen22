import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const Bloglist = () => {
  const blogs = useSelector(state => state.blogs)

 const sortedBLogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <>
    {sortedBLogs.map(blog => (
      <div key={blog.id} style={blogStyle}>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
    ))}
    </>
  )
}

export default Bloglist