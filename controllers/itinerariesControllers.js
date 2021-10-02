const Itinerary = require('../models/Itinerary')

const itinerariesControllers = {
    sendItineraries: (req, res) => {
        Itinerary.find()
            .then( itinerary => res.json({success:true, response: itinerary}))
            .catch( error => res.json({success: false, response: error}))
    },

    addItinerary: (req, res) => {
    const {name, autohr, map, src, comments, description, duration, hashtags, likes, price, restaurants, cityId} = req.body
        const itineraryToAdd = new Itinerary({
            name, autohr, map, src, comments, description, duration, hashtags, likes, price, restaurants, cityId
        })
        itineraryToAdd.save()
            .then( () => res.json({success: true, response: 'Itinerary added'}))
            .catch( error => res.json({success: false, response: error}))
    },

    sendItinerary: (req, res) => {
        Itinerary.findOne( {_id: req.params.id} )
            .then((itinerary) => res.json({success: true, response: itinerary}))
            .catch( error => res.json({success: false, response: error}))
    },

    deleteItinerary: (req, res) => {
        Itinerary.findOneAndDelete( {_id: req.params.id} )
            .then(() => res.json({success: true}))
            .catch( error => res.json({success: false, response: error}))
    },
    sendItinerariesByCity: (req, res) => {
        Itinerary.find( {cityId: req.params.city} )
            .populate({path:'comments', populate: {path:'userId', select: 'name lastname photoUrl'}})
            .then( itineraries => res.json({ success: true, response: itineraries }))
            .catch( error => res.json({success: false, response: error}))
    },

    updateItinerary: (req, res) => {
        Itinerary.findOneAndUpdate({_id: req.params.id}, {...req.body})
            .then( () => res.json({success: true}))
            .catch( error => res.json({success: false, response: error}))
    },

    //likes

    deleteLike: (req, res) => {
        Itinerary.findOneAndUpdate({_id: req.params.itinerary}, {$pull: {likes: `${req.body.userId}`}}, {new: true})
            .then( () => res.json({ success: true}))
            .catch( error => res.json({ success: false, response: error.message }))
    },

    newLike: (req, res) => {
        Itinerary.findOneAndUpdate({_id: req.params.itinerary}, {$push: {likes: `${req.body.userId}`}}, {new: true})
            .then( itinerary => {
                console.log(itinerary)
                itinerary.save()
                res.json({ success: true, response: itinerary.likes })
            })
            .catch( error => res.json({ success: false, response: error.message }))
    },

    //comentarios

    deleteComment: (req, res) => {
        Itinerary.findOneAndUpdate({ _id: req.params.itinerary}, { $pull: { comments: { _id: req.body.commentId }}}, { new: true })
            .then( (itinerary) => res.json({ success: true, response: itinerary.comments}))
            .catch( error => res.json({ success: false, response: error.message }))
    },

    newComment: (req, res) => {
        Itinerary.findOneAndUpdate(
            { _id: req.params.itinerary}, 
            { $push: { comments: { userId: req.body.userId, comment: req.body.comment  } } }, { new: true }
        )
            .populate({ path: "comments", populate: { path: "userId", select:"name lastname photoUrl"} })
            .then( itinerary => {
                itinerary.save()
                console.log(itinerary)
                res.json({ success: true, response: itinerary.comments })
            })
            .catch( error => res.json({ success: false, response: error.message }))
    },
    
    editComment: (req, res) => {
        Itinerary.findOneAndUpdate(
            {_id: req.params.itinerary, "comments._id": req.body._id}, {$set: {"comments.$.comment": req.body.comment }}, {new: true} )
            .populate({ path: "comments", populate: { path: "userId", select: 'name lastname photoUrl'} })
            .then( itinerary => {
                itinerary.save()
                res.json({success: true})
            })
            .catch( error => res.json({ success: false, response: error.message }))
    }
}

module.exports = itinerariesControllers