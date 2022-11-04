import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import BlogForm from "./components/blogForm"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
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
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const userInStorage = window.localStorage.getItem("user")
    userInStorage ? setUser(JSON.parse(userInStorage)) : setUser(null)
  }, [])

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({
        username: username,
        password: password,
      })
      setUser(user)
      handleNotification(`Logged in as ${username}`, false)
      window.localStorage.setItem("user", JSON.stringify(user))
    } catch (err) {
      console.log("log in error")
      handleNotification(err.response.data.error, true)
    }
  }

  const handleNewBlog = async (newBlog) => {
    try {
      blogService.setToken(user.token)
      const resBlog = await blogService.createBlog(newBlog)
      setBlogs(blogs.concat(resBlog))
      handleNotification("Blog added", false)
    } catch (err) {
      console.log(err)
      handleNotification("Error adding blog", true)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const handleNotification = (msg, err) => {
    setNotification({ message: msg, isError: err })
    setTimeout(() => {
      setNotification({ message: null })
    }, 3000)
  }

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
          <Blog key={blog.id} blog={blog} />
        ))}

        <h2>create new</h2>
        <BlogForm createBlog={handleNewBlog} />
      </div>
    )
  }
}

export default App
