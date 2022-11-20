import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { textStyling } from "../styled/styles"

const StyledLink = styled(Link)`
  ${textStyling}
  color: black;
  font-size: 25px;
  text-decoration: none;
`

const StyledBlog = styled.div`
  padding-top: 10px;
  padding-left: 2px;
  margin: 5px 0;
  padding: 5px 0;
  border: dotted;
  border-radius: 10px;
  borderWidth: 1;
  text-align: center;
  background-color: #E5EBB2;
`

const Bloglist = () => {
  const blogs = useSelector(state => state.blogs)

 const sortedBLogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <>
    {sortedBLogs.map(blog => (
      <StyledBlog key={blog.id}>
        <StyledLink to={`/blogs/${blog.id}`}>{blog.title}</StyledLink>
        </StyledBlog>
    ))}
    </>
  )
}

export default Bloglist