const BlogForm = ({ addBlog, title, setTitle, author, setAuthor, url, setUrl}) => {
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
          onChange={({ target }) => setTitle(target.value)}
          >
          </input>
        </div>

        <div>
          Author: 
          <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
          >
          </input>
        </div>

        <div>
          Url: 
          <input
          type="text"
          value={url}
          name="Url"
          onChange={({ target }) => setUrl(target.value)}
          >
          </input>
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default BlogForm;
