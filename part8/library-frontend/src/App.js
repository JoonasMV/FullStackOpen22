import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'
import { useApolloClient, useLazyQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED, CURRENT_USER } from './queries'

// function that takes care of manipulating cache
export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.name
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient();
  
  const [user, userResult] = useLazyQuery(CURRENT_USER, {
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    const token = localStorage.getItem("user-token") 
    if(token) {
      setToken(token)
    }
    user()
  }, []) // eslint-disable-line

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded;
      console.log(addedBook)
      window.alert(`Book added  ${addedBook.title}`)

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)

      client.cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        return {
          allBooks: allBooks.concat(addedBook)
        }
      })
    }
  })

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