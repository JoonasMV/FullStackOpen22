import Homepage from "./components/Homepage"
import LoginForm from "./components/LoginForm"
import Notification from "./components/Notification"
import Users from "./components/Users"
import { useSelector } from "react-redux"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

const App = () => {
  const user = useSelector((state) => state.login)

  if (user.token) {
    return (
      <Router>
        <div>
          <Link to="/">home</Link>
          <Link to="/users">users</Link>
        </div>

        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/users" element={<Users />}/>
        </Routes>
      </Router>
    )
  } else {
    return (
      <>
        <Notification />
        <LoginForm />
      </>
    )
  }
}

export default App
