import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import blogService from "./services/blogs"
import loginService from "./services/login"
import { reduxNotification } from "./slices/notificationSlice"
import { useDispatch, useSelector } from "react-redux"
import { initBlogs } from "./slices/blogSlice"

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    dispatch(initBlogs())
  }, [])
  const reduxBlogs = useSelector(state => state.blogs)
  const sortedBlogs = [...reduxBlogs].sort((a, b) => b.likes - a.likes)

  useEffect(() => {
    const userInStorage = window.localStorage.getItem("user")
    if (userInStorage) {
      const user = JSON.parse(userInStorage)
      setUser(user)
      blogService.setToken(user.token)
    } else {
      setUser(null)
    }
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username: username,
        password: password,
      })
      setUser(user)
      dispatch(reduxNotification(`Logged in as ${username}`, false))
      blogService.setToken(user.token)
      window.localStorage.setItem("user", JSON.stringify(user))
    } catch (err) {
      console.log("log in error")
      dispatch(reduxNotification(err.response.data.error, true))
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.clear()
  }

  const blogFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  } else {
    return (
      <div>
        <Notification />
        <h1>Blogs</h1>
        <div>
          <strong>Logged in as {user.username}</strong>
          <button onClick={handleLogout}>Log out</button>
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
