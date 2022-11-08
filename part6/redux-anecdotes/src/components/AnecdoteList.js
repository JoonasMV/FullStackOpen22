import { useDispatch, useSelector } from "react-redux"
import { setAnecdotes, voteAnecdote } from "../reducers/anecdoteSlice"
import {
  setNotification,
  closeNotification,
} from "../reducers/notificationSlice"
import { useEffect } from "react"

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const anecdotes = useSelector(({ anecdotes, filter }) =>
    anecdotes.filter((a) => a.content.toLowerCase().includes(filter))
  )
  anecdotes.sort((a, b) => b.votes - a.votes )

  const vote = (id) => {
    dispatch(voteAnecdote(id))
    dispatch(setNotification(anecdotes.find((a) => a.id === id)))
    setTimeout(() => dispatch(closeNotification()), 3000)
  }

  return (
    <>
      {anecdotes
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </>
  )
}

export default AnecdoteList
