import { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle("")
    setAuthor("")
    setUrl("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        title:
        <input
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          placeholder={"Blog title"}
          id="titleField"
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          placeholder={"Blog author"}
          id="authorField"
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          placeholder={"Blog url"}
          id="urlField"
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
