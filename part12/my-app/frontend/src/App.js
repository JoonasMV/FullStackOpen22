import { useState, useEffect, useRef } from "react"
import Blog from "./components/Blog"
import BlogForm from "./components/BlogForm"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import Togglable from "./components/Togglable"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({
    message: null,
    isError: false,
  })

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => blogs.sort((a, b) => b.likes - a.likes))
      .then((sortedBlogs) => setBlogs(sortedBlogs))
  }, [])

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
      handleNotification(`Logged in as ${username}`, false)
      blogService.setToken(user.token)
      window.localStorage.setItem("user", JSON.stringify(user))
    } catch (err) {
      console.log("log in error")
      handleNotification(err.response.data.error, true)
    }
  }

  const handleNewBlog = async (newBlog) => {
    try {
      const resBlog = await blogService.createBlog(newBlog)
      setBlogs(blogs.concat(resBlog))
      handleNotification("Blog added", false)
      blogFormRef.current.toggleVisibility()
    } catch (err) {
      console.log(err)
      handleNotification("Error adding blog", true)
    }
  }

  const deleteBlog = async (id) => {
    try {
      const status = await blogService.deleteBlog(id)
      status === 204
        ? handleNotification("Blog successfully deleted", false)
        : handleNotification("Unauthorized", true)

      setBlogs(blogs.filter((blog) => blog.id !== id))
    } catch (ex) {
      handleNotification("Error deleting blog", true)
    }
  }

  const updateBlog = async (blogUpdates) => {
    try {
      const updatedBlog = await blogService.updatedBlog(
        blogUpdates,
        blogUpdates.id
      )
      setBlogs(
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      )
    } catch (err) {
      console.log(err)
      handleNotification("Error liking blog", true)
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.clear()
  }

  const handleNotification = (msg, err) => {
    setNotification({ message: msg, isError: err })
    setTimeout(() => {
      setNotification({ message: null })
    }, 3000)
  }

  const blogFormRef = useRef()

  if (user === null) {
    return (
      <div>
        <Notification notification={notification} />
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  } else {
    return (
      <div>
        <Notification notification={notification} />
        <h1>Blogs</h1>
        <div>
          <strong>Logged in as {user.username}</strong>
          <button onClick={handleLogout}>Log out</button>
        </div>
        <br />

        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            sendLike={updateBlog}
            user={user}
            deleteBlog={deleteBlog}
          />
        ))}

        <h2>create new</h2>
        <Togglable buttonLabel={"new blog"} ref={blogFormRef} >
          <BlogForm createBlog={handleNewBlog} />
        </Togglable>
      </div>
    )
  }
}

export default App
