import { useEffect, useRef } from "react"
import Blog from "./Blog"
import BlogForm from "./BlogForm"
import Notification from "./Notification"
import Togglable from "./Togglable"
import LogOut from "./LogOut"
import { useDispatch, useSelector } from "react-redux"
import { initBlogs } from "../slices/blogSlice"
import { handleLogout } from "../slices/loginSlice"

const Homepage = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initBlogs())
  }, [])
  const reduxBlogs = useSelector(state => state.blogs)
  const sortedBlogs = [...reduxBlogs].sort((a, b) => b.likes - a.likes)
  
  const user = useSelector(state => state.login)

  const blogFormRef = useRef()

  return (
    <div>
      <Notification />
      <h1>Blogs</h1>
      <LogOut />

      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
        />
      ))}

      <h2>create new</h2>
      <Togglable buttonLabel={"new blog"} ref={blogFormRef} >
        <BlogForm toggleRef={blogFormRef} />
      </Togglable>
    </div>
  )
}

export default Homepage