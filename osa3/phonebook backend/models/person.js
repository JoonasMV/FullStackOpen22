const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

console.log(`connecting to ${url}`)

mongoose.connect(url)
    .then(result => {
        console.log("conected to MongoDB")
    })
    .catch((error) => {
        console.log(`error connecting to MongoDB:${error.message}`)
    })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set("toJSON", {
    transform: (document, returnedObjecct) => {
        returnedObjecct.id = returnedObjecct._id.toString()
        delete returnedObjecct._id
        delete returnedObjecct._v
    }
})

module.exports = mongoose.model("Person", personSchema)