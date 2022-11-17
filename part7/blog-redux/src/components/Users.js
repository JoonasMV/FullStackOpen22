import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import userSlice, { initUsers } from "../slices/userSlice"
import { Link } from "react-router-dom"
import LogOut from "./LogOut"

const Users = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(initUsers())
  }, [])

  return (
    <>
      <h1>Users</h1>
      <LogOut />
      <br />

      <table>
        <tbody>
          <tr>
            <td></td>
            <td><b>Blogs created</b></td>
          </tr>
          {users.map((user) => (
          <tr key={user.username}>
            <td>{user.username}</td>
            <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users
