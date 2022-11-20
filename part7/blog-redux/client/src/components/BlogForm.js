import { useState } from "react"
import { useDispatch } from "react-redux"
import { createBlog } from "../slices/blogSlice"
import { textStyling } from "../styled/styles"
import styled from "styled-components"
import StyledButton from "../styled/StyledButton"

const StyledInput = styled.input`
  ${textStyling}
  font-size: 15px;
`

const BlogForm = ({ toggleRef }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(createBlog({
      title: title,
      author: author,
      url: url,
    }))
    setTitle("")
    setAuthor("")
    setUrl("")
    toggleRef.current.toggleVisibility()
  }

  return (
    <form onSubmit={handleSubmit} style={{marginBottom: "10px"}}>
      <div>
        title:
        <StyledInput
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder={"Blog title"}
          id="titleField"
        />
      </div>
      <div>
        author:
        <StyledInput
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder={"Blog author"}
          id="authorField"
        />
      </div>
      <div>
        url:
        <StyledInput
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder={"Blog url"}
          id="urlField"
        />
      </div>
      <StyledButton buttonSize={"15px"} type="submit">create</StyledButton>
    </form>
  )
}

export default BlogForm
