import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { initUsers } from "../slices/userSlice"

const User = () => {
  const dispatch = useDispatch()
  const allUsers = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(initUsers())
  }, [])

  const id = useParams().id
  const user = allUsers.find((user) => user.id === id)

  if (user) {
    return (
      <>
        <h2>{user.username}</h2>
        <h3>Added blogs</h3>
        <ul>
          {user.blogs.map((blog) => (
            <li key={blog.title}>{blog.title}</li>
          ))}
        </ul>
      </>
    )
  }

  return null
}

export default User
