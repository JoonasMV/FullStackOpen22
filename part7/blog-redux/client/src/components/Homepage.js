import { useEffect, useRef } from "react"
import Bloglist from "./Bloglist"
import BlogForm from "./BlogForm"
import Togglable from "./Togglable"
import { useDispatch, useSelector } from "react-redux"
import { initBlogs } from "../slices/blogSlice"

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
        <Bloglist/>

      <h2>create new</h2>
      <Togglable buttonLabel={"new blog"} ref={blogFormRef} >
        <BlogForm toggleRef={blogFormRef} />
      </Togglable>
    </div>
  )
}

export default Homepage