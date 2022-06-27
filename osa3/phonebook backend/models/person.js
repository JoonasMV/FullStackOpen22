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

personSchema.set("toJson", {
    transform: (document, returnedObjecct) => {
        returnedObjecct.id == returnedObjecct.__id.toString()
        delete returnedObjecct.__id
        delete returnedObjecct.__v
    }
})

const Person = mongoose.model("Person", personSchema)