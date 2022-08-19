import { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

  const titleHandler = (event) => {
    setTitle(event.target.value)
  }
  
  const authorHandler = (event) => {
    setAuthor(event.target.value)
  }

  const urlHandler = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle("")
    setAuthor("")
    setUrl("")
  }


  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          Title: 
          <input
          type="text"
          value={title}
          name="Title"
          onChange={titleHandler}
          >
          </input>
        </div>

        <div>
          Author: 
          <input
          type="text"
          value={author}
          name="Author"
          onChange={authorHandler}
          >
          </input>
        </div>

        <div>
          Url: 
          <input
          type="text"
          value={url}
          name="Url"
          onChange={urlHandler}
          >
          </input>
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;