const joi = require('joi')

const validator = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().min(2).required().messages({
            'string.min': 'First name length must be at least 2 characters long',
            'string.empty': 'Please write your first name'
        }),
        lastname: joi.string().trim().min(2).required().messages({
            'string.min': 'Lastname length must be at least 2 characters long',
            'string.empty': 'Please write your lastname'
        }),
        username: joi.string().trim().min(4).max(20).required().messages({
            'string.min': 'Username length must be at least 4 characters long',
            'string.max': 'Username length must be at most 20 characters long',
            'string.empty': 'Please choose an username'
        }),
        email: joi.string().email().trim().required().messages({
            'string.email': 'Use a valid email',
            'string.empty': 'Please write your email'
        }),
        password: joi.string().trim().min(4).required().messages({
            'string.min': 'Password length must be at least 4 characters long',
            'string.empty': 'Please choose a password'
        }),
        photoUrl: joi.string().messages({
            'string.empty': 'Please put some photo url'
        }),
        country: joi.string().required().messages({
            'string.empty': 'Please select your country'
        }),
        rol: joi.string(),
        google: joi.boolean()
    })

    const validation = schema.validate(req.body, {abortEarly: false})
    const validationPushed = []
    validationObjt = {
        firstname: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        photoUrl: '',
        country: ''
    }

    if(!validation.error) {
        next()
    } else {
        validation.error.details.map( error => {
            validationPushed.push(error.message)
        })

        validationObjt = {
            ...validationObjt,

        }

        if (validationPushed.includes('First name length must be at least 2 characters long')) {
            validationObjt = {
                ...validationObjt,
                firstname: 'First name length must be at least 2 characters long'
            }
        }
        
        if (validationPushed.includes('Please write your first name')) {
            validationObjt = {
                ...validationObjt,
                firstname: 'Please write your first name'
            }
        }
        
        if (validationPushed.includes('Lastname length must be at least 2 characters long')) {
            validationObjt = {
                ...validationObjt,
                lastname: 'Lastname length must be at least 2 characters long'
            }
        }
        
        if (validationPushed.includes('Please write your lastname')) {
            validationObjt = {
                ...validationObjt,
                lastname: 'Please write your lastname'
            }
        }
        
        if (validationPushed.includes('Username length must be at least 4 characters long')) {
            validationObjt = {
                ...validationObjt,
                username: 'Username length must be at least 4 characters long'
            }
        }
            
        if (validationPushed.includes('Username length must be at most 20 characters long')) {
            validationObjt = {
                ...validationObjt,
                username: 'Username length must be at most 20 characters long'
            }
        }
        
        if (validationPushed.includes('Please choose an username')) {
            validationObjt = {
                ...validationObjt,
                username: 'Please choose an username'
            }
        }
        
        if (validationPushed.includes('Use a valid email')) {
            validationObjt = {
                ...validationObjt,
                email: 'Use a valid email'
            }
        }
        
        if (validationPushed.includes('Please write your email')) {
            validationObjt = {
                ...validationObjt,
                email: 'Please write your email'
            }
        } 
        
        if (validationPushed.includes('Password length must be at least 4 characters long')) {
            validationObjt = {
                ...validationObjt,
                password: 'Password length must be at least 4 characters long'
            }
        } 
        
        if (validationPushed.includes('Please choose a password')) {
            validationObjt = {
                ...validationObjt,
                password: 'Please choose a password'
            }
        } 
        
        if (validationPushed.includes('Please put some photo url')) {
            validationObjt = {
                ...validationObjt,
                photoUrl: 'Please put some photo url'
            }
        }
        
        if (validationPushed.includes('Please select your country')) {
            validationObjt = {
                ...validationObjt,
                country: 'Please select your country'
            }
        }

        res.json({success: false, validationError: validationObjt, authResponse: 'Complete correctly your data'})
    }
}


module.exports = validator