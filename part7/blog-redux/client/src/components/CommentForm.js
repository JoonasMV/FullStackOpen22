import { useDispatch } from "react-redux"
import { postComment } from "../slices/blogSlice"
import { useState } from "react"
import { useParams } from "react-router-dom"

const CommentForm = ({ toggleRef }) => {
  const dispatch = useDispatch()
  const id = useParams().id

  const [comment, setComment] = useState("")

  const handleCommenting = (event) => {
    event.preventDefault()
    dispatch(postComment(id, { comment }))
    toggleRef.current.toggleVisibility()
  }

  return (
    <>
      <form>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={handleCommenting}>post comment</button>
      </form>
    </>
  )
}

export default CommentForm
