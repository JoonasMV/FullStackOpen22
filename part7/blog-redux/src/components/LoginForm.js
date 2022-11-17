import { handleLogin } from "../slices/loginSlice"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { setLoggedInUser } from "../slices/loginSlice"

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setLoggedInUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const userInStorage = window.localStorage.getItem("user")
    if (userInStorage) {
      const user = JSON.parse(userInStorage)
      dispatch(setLoggedInUser(user))
    } else {
      dispatch(setLoggedInUser(null))
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(handleLogin(username, password))
    setLoggedInUsername("")
    setPassword("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          type="text"
          value={username}
          onChange={({ target }) => setLoggedInUsername(target.value)}
          id="loginField"
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          id="passwordField"
        />
      </div>
      <button id="loginButton" type="submit">Login</button>
    </form>
  )
}

export default LoginForm
