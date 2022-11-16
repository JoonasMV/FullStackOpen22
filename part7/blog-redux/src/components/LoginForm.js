import { useState } from "react"

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin(username, password)
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
