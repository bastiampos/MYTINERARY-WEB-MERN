const express = require('express')
const passport = require('passport')
const router = express.Router()

const citiesControllers = require('../controllers/citiesControllers')
const itinerariesControllers = require('../controllers/itinerariesControllers')
const authenticationControllers = require('../controllers/authenticationControllers')
const activitiesControllers = require('../controllers/activitiesControllers')
const validator = require('../controllers/validator')


//CITIES

router.route('/cities')
    .get(citiesControllers.sendCities)
    .post(citiesControllers.addCity)

router.route('/citieslock')
    .get(
        passport.authenticate('jwt', {session: false}), 
        citiesControllers.sendCitiesLock
    )

router.route('/city/:id')
    .get(citiesControllers.sendCity)
    .put(citiesControllers.updateCity)
    .delete(citiesControllers.deleteCity)
     

// ITINERARIOS

router.route('/itineraries')
    .get(itinerariesControllers.sendItineraries)
    .post(itinerariesControllers.addItinerary)

router.route('/itinerary/:id')
    .get(itinerariesControllers.sendItinerary)
    .put(itinerariesControllers.updateItinerary)
    .delete(itinerariesControllers.deleteItinerary)

//COMENTARIOS

router.route('/comments/:itinerary')
    .post(
        // passport.authenticate('jwt', {session: false}),
        itinerariesControllers.newComment
    )

    router.route('/deletecomment/:itinerary')
    .post(
        // passport.authenticate('jwt', {session: false}),
        itinerariesControllers.deleteComment
    )

    router.route('/editcomment/:itinerary')
    .post(
        // passport.authenticate('jwt', {session: false}),
        itinerariesControllers.editComment
    )

//LIKES

router.route('/likes/:itinerary')
    .post(
        // passport.authenticate('jwt', {session: false}),
        itinerariesControllers.newLike
    )

router.route('/deletelike/:itinerary')
    .post(
        // passport.authenticate('jwt', {session: false}),
        itinerariesControllers.deleteLike
    )


router.route('/itineraries/:city')
    .get(itinerariesControllers.sendItinerariesByCity)


// AUTENTICACION DE USUARIO

router.route('/user/singup')
    .post(
        validator, 
        authenticationControllers.newUser
    )

router.route('/user/singin')
    .post(authenticationControllers.userSingIn)

router.route('/verifytoken')
    .get(
        passport.authenticate('jwt', {session: false}),
        authenticationControllers.verifyToken
    )

//ACTIVITIES

router.route('/activities')
        .get(activitiesControllers.sendActivities)
        .post(activitiesControllers.addActivity)

router.route('/activities/:itinerary')
        .get(activitiesControllers.sendActivitiesByItinerary)

router.route('/activity/:id')
        .put(activitiesControllers.updateActivity)
        .delete(activitiesControllers.deleteActivity)

module.exports = router