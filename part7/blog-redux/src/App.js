import { useEffect, useRef } from "react"
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import { useDispatch, useSelector } from "react-redux"
import { initBlogs } from "./slices/blogSlice"
import { handleLogout } from "./slices/userSlice"

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initBlogs())
  }, [])
  const reduxBlogs = useSelector(state => state.blogs)
  const sortedBlogs = [...reduxBlogs].sort((a, b) => b.likes - a.likes)
  
  const user = useSelector(state => state.login)

  const blogFormRef = useRef()

  if (user.token === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
      </div>
    )
  } else {
    return (
      <div>
        <Notification />
        <h1>Blogs</h1>
        <div>
          <strong>Logged in as {user.username}</strong>
          <button onClick={() => dispatch(handleLogout())}>Log out</button>
        </div>
        <br />

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
}

export default App
