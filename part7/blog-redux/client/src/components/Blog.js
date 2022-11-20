import { useDispatch, useSelector } from "react-redux"
import { updateBlog } from "../slices/blogSlice"
import { useParams } from "react-router-dom"
import Togglable from "./Togglable"
import CommentForm from "./CommentForm"
import { useRef } from "react"
import StyledButton from "../styled/StyledButton"

const Blog = () => {
  const commentFormRef = useRef()
  const dispatch = useDispatch()

  const id = useParams().id
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  )

  const handleLike = () => {
    const updatedBlog = {
      likes: blog.likes + 1,
      id: blog.id,
    }
    dispatch(updateBlog(updatedBlog))
  }

  if (!blog) return null

  return (
    <>
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes <StyledButton buttonSize={"15px"} onClick={handleLike}>like</StyledButton>
      </div>
      <div>added by {blog.user.name}</div>
      <h3>comments</h3>
      <Togglable buttonLabel="add comment" ref={commentFormRef} >
        <CommentForm toggleRef={commentFormRef}/>
      </Togglable>
      <ul style={{listStyleType: "none"}}>
        {blog.comments 
          ? (blog.comments.map((comment, index) => <li  key={index}>{comment}</li>)) 
          : (<li><strong>No comments yet</strong></li>)}
      </ul>
    </>
  )
}

export default Blog
