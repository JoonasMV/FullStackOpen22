import { useDispatch, useSelector } from "react-redux"
import { handleLogout } from "../slices/loginSlice"

const LogOut = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.login)


  return (
    <div>
      <strong>Logged in as {loggedInUser.username}</strong>
        <button onClick={() => dispatch(handleLogout())}>Log out</button>
    </div>
  )
}

export default LogOut