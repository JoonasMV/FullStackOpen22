require("dotenv").config()

let PORT = process.env.PORT
let MONGO_URI = process.env.MONGO_URI
console.log(PORT)

module.exports = { PORT, MONGO_URI }