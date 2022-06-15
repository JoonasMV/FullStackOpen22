const { response } = require("express")
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :data"))
app.use(cors())

morgan.token("data", (req, res) => {
  return req.method === "POST" ? JSON.stringify(req.body) : " "
})

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

app.get('/api/persons/:id', (req,res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.get('/info', (req, res) => {
  const people = persons.length
  const html = `
  <div>Phonebook has info for ${people} people<div>
  <div>${Date()}<div>
  `
  res.send(html)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  persons = persons.filter(person => person.id !== id)

  if (person) {
    res.status(204).end()
  } else {
    res.status(404).end()
  }
})

const generateID = () => Math.ceil(Math.random() * 1000000)

app.post('/api/persons', (req, res) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
    id: generateID(),
  }

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing"
    })
  }

  let dupName = false
  let dupNumber = false
  persons.forEach(element => {    
    if (element.name === person.name) {
      dupName = true
    }
    if (element.number === person.number) {
      dupNumber = true
    }
  })

  if (dupName) {
    return res.status(400).json({
      error: "name must be unique"
    }).end()
  }
  if (dupNumber) {
    return res.status(400).json({
      error: "number must be unique"
    }).end()
  }

  persons = persons.concat(person)
  res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})