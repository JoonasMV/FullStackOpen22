const express = require("express")
const morgan = require("morgan")
const app = express()

const Person = require("./models/Person")

app.use(express.json())
app.use(express.static("build"))

morgan.token("data", (req, res) => {
  return req.method === "POST" ? JSON.stringify(req.body) : " "
})

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
)

app.get("/info", (req, res) => {
  Person.count({}, (err, count) => {
    if (err) {
      res.send(`<div>Error counting data</div>`)
    }

    const totalPeople = count
    res.send(
      `<div>
        <div>Phonebook has info for ${totalPeople}</div>
        <div>${new Date()}</div>
      </div>`
    )
  })
})

app.get("/api/persons", (req, res, next) => {
  Person.find({})
    .then((persons) => {
      res.json(persons)
    })
    .catch((err) => next(err))
})

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      person ? res.json(person) : res.sendStatus(404)
    })
    .catch((err) => next(err))
})

app.post("/api/persons", (req, res, next) => {
  const newPerson = new Person({
    name: req.body.name,
    number: req.body.number,
  })

  newPerson
    .save()
    .then((savedPerson) => {
      res.json(savedPerson)
    })
    .catch((err) => next(err))
})

app.put("/api/persons/:id", (req, res, next) => {
  const person = {
    name: req.body.name,
    number: req.body.number,
  }

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson)
    })
    .catch((err) => next(err))
})

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).end())
    .catch((err) => next(err))
})

const errorHandler = (err, req, res, next) => {
  if (err.name === "CastError") {
    res.status(400).json({ error: "malformatted id" })
  } else if (err.name === "ValidationError") {
    res.status(400).json({ error: err.message })
  } else {
    res.status(400).json({ error: "other error" })
  }
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})
