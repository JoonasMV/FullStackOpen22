const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const Person = require("./models/person")

const morgan = require("morgan")

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

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
  .then(person => {
    if (note) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
  .catch(error => next(error))
})

// app.get('/info', (req, res) => {
//   const people = persons.length
//   const html = `
//   <div>Phonebook has info for ${people} people<div>
//   <div>${Date()}<div>
//   `
//   res.send(html)
// })

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  if (!body.name || !body.number) {
    return res.status(400).json({error: "content missing" })
  }

  person.save()
  .then(savedPerson => {
    res.json(savedPerson)
  })
  .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
    .catch(error => next(error))
})

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" })
  }

  next(error)
}

app.use(errorHandler)

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})