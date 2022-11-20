import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import Bloglist from "./components/Bloglist"
import Blog from "./components/Blog"
import Togglable from "./components/Togglable"
import Blogform from "./components/BlogForm"
import Users from "./components/Users"
import User from "./components/User"
import Navbar from "./components/Navbar"

import { useDispatch, useSelector } from "react-redux"
import { Routes, Route } from "react-router-dom"
import { useEffect, useRef } from "react"
import { initBlogs } from "./slices/blogSlice"
import { initUsers } from "./slices/userSlice"
import styled, { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  body {
    background: #FFFBC1;
    font-family: consolas;
  }
`

const Container = styled.div`
  padding: 1% 25%;
`
const StyledTitle = styled.h1`
  font-family: consolas;
  font-style: oblique;
`

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
    <Container>
      <GlobalStyle />
      <Navbar />
      <Notification />
      <StyledTitle>Blog app</StyledTitle>
      <Togglable buttonLabel={"create new"} ref={blogFormRef}>
        <Blogform toggleRef={blogFormRef} />
      </Togglable>

      <Routes>
        <Route path="/" element={<Bloglist />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
      </Routes>
    </Container>
  )
}

export default App
