import Blog from './components/Blog'

const Blog = ({blog}) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

export default Blog