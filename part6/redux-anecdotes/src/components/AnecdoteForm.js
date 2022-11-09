import { connect } from "react-redux"
import { useDispatch } from "react-redux"
import { newAnecdote } from "../reducers/anecdoteSlice"

const AnecdoteForm = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = (e) => {
    e.preventDefault()
    props.newAnecdote(e.target.anecdote.value)
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

const mapDispatchToProps = {
  newAnecdote
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
