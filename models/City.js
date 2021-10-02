const mongoose = require('mongoose')
const { Schema } = mongoose

const CitySchema = new Schema({
    name: String,
    country: String,
    src: String,
    description: String,
    currency: String,
    lenguage: String,
    totalItineraries: Number,
    mostVisited: Boolean,
    haveSea: Boolean,
    seasons: Array,
})

const City = mongoose.model('city', CitySchema)

module.exports = City