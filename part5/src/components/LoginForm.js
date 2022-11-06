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
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="text"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  )
}

export default LoginForm
