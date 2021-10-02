const mongoose = require('mongoose')
const { Schema } = mongoose

const ActivitySchema = new Schema({
    name: String,
    description: String,
    src: String,
    itineraryId: {type: mongoose.Types.ObjectId, ref: 'itinerary'}
})

const Activity = mongoose.model('activity', ActivitySchema)

module.exports = Activity