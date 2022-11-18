import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { handleLogout } from "../slices/loginSlice"

const Navbar = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.login)

  const navStyle = {
    background: "silver",
    padding: 5
  }

  const padding = {
    paddingRight: 5
  }
 
  return (
    <div style={navStyle} >
        <Link style={padding} to="/">Home </Link>
        <Link style={padding} to="/users">Users</Link>
        <strong style={padding} >{loggedInUser.username} logged in</strong>
        <button style={padding} onClick={() => dispatch(handleLogout())}>Log out</button>
    </div>
  )
}

export default Navbar