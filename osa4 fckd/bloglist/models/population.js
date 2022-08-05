const mongoose = require("mongoose");

const populationSchema = mongoose.Schema({
    population: String
})

module.exports = mongoose.model("Population", populationSchema)