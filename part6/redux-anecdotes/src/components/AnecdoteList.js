import { useDispatch, useSelector } from "react-redux"
import { handleVote, initializeAnecdotes, voteAnecdote } from "../reducers/anecdoteSlice"
import { setNotification } from "../reducers/notificationSlice"
import { useEffect } from "react"

const AnecdoteList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

  const anecdotes = useSelector(({ anecdotes, filter }) =>
    filter
      ? anecdotes.filter((a) => a.content.toLowerCase().includes(filter.toLowerCase()))
      : anecdotes
  )
  
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  
  const vote = (id, content) => {
    dispatch(handleVote(id))

    dispatch(setNotification(`you voted ${content}`, 5))
  }

  return (
    <>
      {sortedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
