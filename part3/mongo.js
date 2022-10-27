require("dotenv").config()
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Conntected to MongoDB"))
  .catch(e => console.log(`Error connecting to DB ${e}`))

const personSchema = new mongoose.Schema({
  name: String,
  number: Number
})

const Person = mongoose.model("Person", personSchema)