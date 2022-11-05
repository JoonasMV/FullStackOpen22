import axios from "axios"
const baseUrl = "/api/blogs"

let token = null
let config = null
const setToken = newToken => {
  token = `bearer ${newToken}`
  config = { headers: { Authorization: token }}
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const createBlog = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updatedBlog = async (updatedBlog, id) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedBlog, config)
  return response.data
}

const blogService = { getAll, createBlog, setToken, updatedBlog }
export default blogService
