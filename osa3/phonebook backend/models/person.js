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
    name: {
        type: String,
        minlength: 3,
        required: [true, "Name of person required"],
    },
    number: {
        type: String,
        validate: {
            validator: function(input) {
                if(/^\d{2}-\d{6,}$/.test(input) || /^\d{3}-\d{5,}/.test(input)) {
                    return true
                } else {
                    return false
                }
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        required: [true, "User phone number required"],
    }
})

personSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model("Person", personSchema)