import { useState, useEffect, useInsertionEffect } from "react"
import Blog from "./components/Blog"
import BlogForm from "./components/blogForm"
import LoginForm from "./components/LoginForm"
import blogService from "./services/blogs"
import loginService from "./services/login"

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const userInStorage = window.localStorage.getItem("user")
    userInStorage 
      ? setUser(JSON.parse(userInStorage))
      : setUser(null)
  }, [])

  const handleLogin = async (username, password) => {
    try {
      console.log(username)
      const user = await loginService.login({ username: username, password: password })
      setUser(user)
      window.localStorage.setItem("user", JSON.stringify(user))
      console.log(window.localStorage.getItem("user"))
    } catch (err) {
      console.log(err)
      console.log("error logging in")
    }
  }

  const handleNewBlog = async (newBlog) => {
    try {
      blogService.setToken(user.token)
      await blogService.createBlog(newBlog)
    } catch (err) {
      console.log(err)
      console.log("error posting new blog")
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  if (user === null) {
    return <LoginForm handleLogin={handleLogin} />
  }
  else {
    return (
      <div>
        <h1>Logged in as {user.username}</h1>
        <button onClick={handleLogout}>Log out</button>
  
        <h2>blogs</h2>
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
