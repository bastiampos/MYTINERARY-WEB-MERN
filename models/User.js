const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    photoUrl: {type: String, default: ''},
    country: {type: String, required: true},
    rol: {type: String, default: 'user'},
    google: {type: Boolean, default: false},
    itinerariesLiked: {type: Array, default: []}
})

const User = mongoose.model('user', UserSchema)

module.exports = User