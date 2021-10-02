const User = require('../models/User')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authenticationControllers = {

    newUser: (req, res) => {

        const { name, lastname, username, email, password, country, photoUrl, google } = req.body

        let hashedPassword = bcryptjs.hashSync(password)
        const userToAdd = new User({
            name, 
            lastname, 
            username, 
            email, 
            password: hashedPassword, 
            country, 
            photoUrl,
            google
        })

        User.findOne({email: email})
            .then( user => {
                if (user) {
                    throw new Error('Email already in use')
                }

                userToAdd.save()
                let userToken =  jwt.sign({...userToAdd}, process.env.SECRETORKEY)

                res.json({
                    success: true, 
                    response: {
                        name: userToAdd.name, 
                        lastname: userToAdd.lastname,
                        username: userToAdd.username, 
                        photoUrl: userToAdd.photoUrl, 
                        token: userToken,
                        country: userToAdd.country,
                        _id: userToAdd._id
                    }, 
                    authResponse: 'You are registered now'
                })
            })
            .catch(error => res.json({success: false, error: error.message, response: null, authResponse: error.message}))
    },

    userSingIn: (req, res) => {
        const {email, password, flagGoogle} = req.body

        User.findOne( {email: email} )
            .then( user => {
                if (!user) throw new Error('Incorrect email or password -e')

                if(user.google && !flagGoogle ) throw new Error('You created your account with Google, please sign in with them')

                let passMatch = bcryptjs.compareSync(password, user.password)
                if (!passMatch) throw new Error('Incorrect email or password -p')
                let userToken =  jwt.sign({...user}, process.env.SECRETORKEY)
                res.json({
                    success: true,
                    error: null, 
                    response: {
                        name: user.name, 
                        username: user.username,
                        lastname: user.lastname,
                        photoUrl: user.photoUrl, 
                        token: userToken,
                        country: user.country,
                        _id: user._id
                    }, 
                    authResponse: 'You are logged now'
                })
            })
            .catch(error => res.json({success: false, error: error.message, response: null, authResponse: error.message}))
    },

    verifyToken: (req, res) => {
        res.json({
            name: req.user.name,
            photoUrl: req.user.photoUrl,
            username: req.user.username,
            _id: req.user._id
        })
    }
}

module.exports = authenticationControllers