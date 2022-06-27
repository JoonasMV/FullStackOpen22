const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
`mongodb+srv://FullStack22:${password}@cluster0.chfes.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const personName = process.argv[3]
const personNumber = process.argv[4]

const Person = mongoose.model("Person", personSchema)

const person = new Person({
    name: personName,
    number: personNumber,
})

if (process.argv.length == 5) {
    person.save().then(result => {
        console.log(`Added ${personName} number ${personNumber} to phonebook`)
        mongoose.connection.close()
    })
}

if (process.argv.length==3) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
}