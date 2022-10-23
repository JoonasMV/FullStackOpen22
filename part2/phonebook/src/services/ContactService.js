import axios from "axios"
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data)
}

const create = (newContact) => {
  return axios.post(baseUrl, newContact).then((response) => response.data)
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const contactService = { getAll, create, update, remove }
export default contactService
