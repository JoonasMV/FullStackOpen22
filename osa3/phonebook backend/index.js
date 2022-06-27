const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const Person = require("./models/person")

const morgan = require("morgan")
const { response } = require("express")

app.use(express.json())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :data"))
app.use(cors())
app.use(express.static("build"))

morgan.token("data", (req, res) => {
  return req.method === "POST" ? JSON.stringify(req.body) : " "
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req,res) => {
  Person.findById(req.params.id)
  .then(person => {
    res.json(person)
  })
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

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  if (!body.name || !body.number) {
    return res.status(400).json({error: "content missing" })
  }

  // let dupName = false
  // let dupNumber = false
  // persons.forEach(element => {    
  //   if (element.name === person.name) {
  //     dupName = true
  //   }
  //   if (element.number === person.number) {
  //     dupNumber = true
  //   }
  // })

  // if (dupName) {
  //   return res.status(400).json({
  //     error: "name must be unique"
  //   }).end()
  // }
  // if (dupNumber) {
  //   return res.status(400).json({
  //     error: "number must be unique"
  //   }).end()
  // }

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})