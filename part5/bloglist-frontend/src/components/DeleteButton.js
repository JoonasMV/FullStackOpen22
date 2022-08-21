const DeleteButton = ({ blog, deleteBlog }) => {
  const handleDelete = () => {
    if (window.confirm(`Delete blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }
  return <button onClick={handleDelete}>Delete</button>
}

export default DeleteButton