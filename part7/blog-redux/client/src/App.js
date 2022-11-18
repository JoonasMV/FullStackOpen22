import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import LogOut from "./components/LogOut"
import Bloglist from "./components/Bloglist"
import Blog from "./components/Blog"
import Togglable from "./components/Togglable"
import Blogform from "./components/BlogForm"
import Users from "./components/Users"
import User from "./components/User"
import Navbar from "./components/Navbar"

import { useDispatch, useSelector } from "react-redux"
import { Routes, Route, Link } from "react-router-dom"
import { useEffect, useRef } from "react"
import { initBlogs } from "./slices/blogSlice"
import { initUsers } from "./slices/userSlice"

const App = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUsers())
  }, [])

  if (!user.token) {
    return (
      <>
        <Notification />
        <LoginForm />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <Notification />
      <h1>Blog app</h1>
      <Togglable buttonLabel={"create new"} ref={blogFormRef}>
        <Blogform toggleRef={blogFormRef}/>
      </Togglable>

      <Routes>
        <Route path="/" element={<Bloglist />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </>
  )
}

export default App
