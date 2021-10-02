const mongoose = require('mongoose')
const { Schema } = mongoose

const ItinerarySchema = new Schema({
    name: String,
    author: Object,
    map: String,
    src: String,
    comments: {
        type: [
            {userId: {type: mongoose.Types.ObjectId, ref: 'user'}, 
            comment: String}
        ],
        default: []
    },
    description: String,
    duration: Number,
    hashtags: Array,
    likes: {type: Array, default: []},
    price: {type: Number, default: 1, min: 1, max: 5},
    restaurants: Object,
    cityId: {type: mongoose.Types.ObjectId, ref: 'city'},
})

const Itinerary = mongoose.model('itinerary', ItinerarySchema)

module.exports = Itinerary