const Activity = require('../models/Activity')

const activitiesControllers = {
    sendActivities: (req, res) => {
        Activity.find()
        .then( (activities) => res.json({success: true, response: activities }) )
        .catch( error => res.json({success: false, response: error}))
    },

    addActivity: (req, res) => {
        const {name, description, src, itineraryId} = req.body
        const activityToAdd = new Activity( {name, description, src, itineraryId} )

        activityToAdd.save()
            .then(() => res.json({success: true}))
            .catch( error => res.json({success: false, response: error}))
    },

    sendActivitiesByItinerary: (req, res) => {
        Activity.find( { itineraryId: req.params.itinerary} )
            .then( activities => res.json({ success: true, response: activities }))
            .catch( error => res.json({success: false, response: error}))
    },

    updateActivity: (req, res) => {
        Activity.findOneAndUpdate({_id: req.params.id}, {...req.body})
        .then(() => res.json({success: true}))
        .catch( error => res.json({success: false, response: error}))
    },

    deleteActivity: (req, res) => {
        Activity.findOneAndDelete( {_id: req.params.id} )
        .then(() => res.json({success: true}))
        .catch( error => res.json( {success: false, response: error} ) )
    }
}

module.exports = activitiesControllers