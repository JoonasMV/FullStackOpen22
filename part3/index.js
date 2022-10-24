const { json } = require("express")
const express = require("express")
const morgan = require("morgan")
const app = express()
app.use(express.json())
app.use(express.static("build"))

morgan.token("data", (req, res) => {
  return req.method === "POST" ? JSON.stringify(req.body) : " "
})

app.use(morgan(":method :url :status :res[content-length] - :response-time ms :data"))

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
]

app.get("/info", (req, res) => {
  const totalPeople = persons.length
  res.send(
    `<div>
      <div>Phonebook has info for ${totalPeople}</div>
      <div>${new Date()}</div>
    </div>`
  )
})

app.get("/api/persons", (req, res) => {
  res.send(persons)
})

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    res.send(persons.find(person => person.id === id))
  } else{
    res.status(404).send(`<h1>Error 404</h1>`)
  }
})

app.post("/api/persons", (req, res) => {
  const newPerson = {
    name: req.body.name,
    number: req.body.number,
    id: Math.floor(Math.random() * 10000)
  }
  const duplicateName = persons.find(person => person.name === newPerson.name)
 
  if(!(duplicateName)) {
     res.status(400).send(`<h1>Name already in phonebook</h1>`)
   } else if (!(req.body.name) || !(req.body.number)) {
     res.status(400).send(`<h1>Name or number missing</h1>`)
   } else {
    persons = persons.concat(newPerson)
    res.json(newPerson)
  }
})

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
