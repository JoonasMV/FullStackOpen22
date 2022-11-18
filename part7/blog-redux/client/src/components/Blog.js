import { useDispatch, useSelector } from "react-redux"
import { updateBlog } from "../slices/blogSlice"
import { useParams } from "react-router-dom"

const Blog = () => {
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
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
    </>
  )
}

export default Blog
