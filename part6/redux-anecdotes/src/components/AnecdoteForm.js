import { useDispatch } from "react-redux"
import { newAnecdote } from "../reducers/anecdoteSlice"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (e) => {
    e.preventDefault()
    dispatch(newAnecdote(e.target.anecdote.value))
    e.target.anecdote.value = ""
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
