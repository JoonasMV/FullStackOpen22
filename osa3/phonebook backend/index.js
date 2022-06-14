const express = require("express")
const responseTime = require('response-time')

const app = express()

app.use(responseTime((req, res, time) => {
  console.log(`${req.method} ${req.url} ${time}`)
  console.log(time)
  return (
    time
  )
}))

let persons =  [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  res.send("test")
  console.log("asd",responseTime())
})


console.log("test")
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})