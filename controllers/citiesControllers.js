const City = require('../models/City')

const citiesControllers = {

    sendCities:  (req, res) => {
        City.find()
            .then( (cities) => res.json({success: true, response: cities }) )
            .catch( error => res.json({success: false, response: error}))
    },
    
    sendCitiesLock:  (req, res) => {
        City.find()
            .then( (cities) => res.json({success: true, response: cities }) )
            .catch( error => res.json({success: false, response: error}))
    },

    addCity: (req, res) => {
        const {name, country, src, description, currency, lenguage, totalItineraries, mostVisited, haveSea, seasons} = req.body

        const cityToAdd = new City({
            name, country, src, description, currency, lenguage, totalItineraries, mostVisited, haveSea, seasons
        })
        cityToAdd.save()
            .then(() => res.json({success: true}))
            .catch( error => res.json({success: false, response: error}))
    },

    sendCity: (req, res) => {
        City.findOne( {_id: req.params.id} )
            .then((city) => res.json({success: true, response: city}))
            .catch( error => res.json({success: false, response: error}))
    },

    deleteCity: (req, res) => {
        City.findOneAndDelete( {_id: req.params.id} )
            .then(() => res.json({success: true}))
            .catch( error => res.json({success: false, response: error}))
    },
    
    updateCity: (req, res) => {
        City.findOneAndUpdate({_id: req.params.id}, {...req.body})
            .then(() => res.json({success: true}))
            .catch( error => res.json({success: false, response: error}))
    }
} 

module.exports = citiesControllers

