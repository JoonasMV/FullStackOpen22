require("dotenv").config()
const mongoose = require("mongoose")

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conntected to MongoDB"))
  .catch((e) => console.log(`Error connecting to DB ${e}`))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: (v) => {
        return (/\d{2}-\d{6,}/.test(v) || /\d{3}-\d{5,}/.test(v)) ? true : false
      },
      message: "Phone numbers must start with XX- or XXX-",
    },
  },
})

personSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    delete ret._id, delete ret.__v
  },
})

const Person = mongoose.model("Person", personSchema)
module.exports = Person
