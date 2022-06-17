import axios from "axios";
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const addPerson = newPerson => {
    const request = axios.post(baseUrl, newPerson)
    return request.then(response => response.data)
}

const delPerson = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)

}

const changeNumber = (id, newPerson) => {
    const request = axios.put(`${baseUrl}/${id}`, newPerson)
    return request.then(response => response.data)
}

export default { getAll, addPerson, delPerson, changeNumber }