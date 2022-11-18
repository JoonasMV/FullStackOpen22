import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { initUsers } from "../slices/userSlice"
import { Link } from "react-router-dom"

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(initUsers())
  }, [])

  return (
    <>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td>
              <b>Blogs created</b>
            </td>
          </tr>
          {users.map((user) => (
            <tr key={user.username}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users
