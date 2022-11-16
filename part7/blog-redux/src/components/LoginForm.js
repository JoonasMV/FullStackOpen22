import { handleLogin } from "../slices/userSlice"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { setUser } from "../slices/userSlice"

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  useEffect(() => {
    const userInStorage = window.localStorage.getItem("user")
    if (userInStorage) {
      const user = JSON.parse(userInStorage)
      dispatch(setUser(user))
    } else {
      dispatch(setUser(null))
    }
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(handleLogin(username, password))
    setUsername("")
    setPassword("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        username
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
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
