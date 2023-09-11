import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'
import { useLazyQuery } from '@apollo/client'
import { CURRENT_USER } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  
  const [user, userResult] = useLazyQuery(CURRENT_USER, {
    fetchPolicy: 'no-cache',
  });
  console.log(userResult?.data?.me?.favoriteGenre)


  useEffect(() => {
    const token = localStorage.getItem("user-token") 
    if(token) {
      setToken(token)
    }
    user()
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

      <Books show={page === 'books'}  />

      <NewBook show={page === 'add'} />

      <Login show={page === "login"} setToken={setToken} token={token} getUser={user} />

      <Recommendations show={page === "recommendations" && token} favoriteGenre={userResult?.data?.me?.favoriteGenre} />
    </div>
  )
}

export default App