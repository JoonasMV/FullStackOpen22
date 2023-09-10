import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  
  useEffect(() => {
    if(localStorage.getItem("user-token")) {
      setToken(localStorage.getItem("user-token"))
    }
  }, [])

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        <button onClick={() => setPage('login')}>{token ? "logout" : "login"}</button>
        {token && <button onClick={() => setPage('recommendations')}>recommendations</button>}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Recommendations show={page === "recommendations" && token} />

      <Login show={page === "login"} setToken={setToken} token={token} />
    </div>
  )
}

export default App
