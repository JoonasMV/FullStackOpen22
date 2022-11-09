import axios from "axios"

const baseUrl = "http://localhost:3001/anecdotes/"

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const postAnecdote = async (content) => {
  const newAnecdote = {
    content,
    votes: 0
  }
  const response = await axios.post(baseUrl, newAnecdote)
  return response.data
}

const putVote = async (id, anecdoteToVote) => {
  const votedAnecdote = {
    ...anecdoteToVote,
    votes: anecdoteToVote.votes + 1,
  }

  const response = await axios.put(`${baseUrl}/${id}`, votedAnecdote)
  return response.data
}

export default { getAll, postAnecdote, putVote }
