import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import {
  setNotification,
  closeNotification,
} from "../reducers/notificationSlice"

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdote)
  const filter = useSelector((state) => state.filter.toLowerCase())

  const dispatch = useDispatch()

  const vote = (id) => {
    //console.log("vote", id)

    dispatch(voteAnecdote(id))
    dispatch(setNotification(anecdotes.find((a) => a.id === id)))
    setTimeout(() => dispatch(closeNotification()), 3000)
  }

  return (
    <>
      {anecdotes
        .filter((a) => a.content.toLowerCase().includes(filter))
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
