const authReducer = ( state= {token: null, userInfo: {}, authResponse: '', styleLoginButton: '', validationError: {}}, action) => {
    switch (action.type) {
        case 'AUTH_USER': 
            const {success, response, authResponse, validationError} = action.payload
            if(success) {
                localStorage.setItem('token', response.token)
                return {
                    ...state,
                    authResponse: authResponse,
                    token: response.token,
                    styleLoginButton: 'alert-success-login',
                    userInfo: {
                        name: response.name,
                        lastname: response.lastname,
                        username: response.username,
                        photoUrl: response.photoUrl,
                        _id: response._id
                    }
                }
            } 

            if (!success){
                if(authResponse.includes('Email already in use')){
                    return {
                        ...state,
                        authResponse: authResponse,
                        styleLoginButton: 'alert-error-login',
                        validationError: validationError
                    }
                } else if (authResponse.includes('Incorrect email or password')) {
                    return {
                        ...state,
                        authResponse: authResponse,
                        styleLoginButton: 'alert-error-login',
                    }
                } else if (authResponse.includes('You created your account with Google')) {
                    return {
                        ...state,
                        authResponse: authResponse,
                        styleLoginButton: 'alert-error-login',
                    }
                } else if (validationError) {
                    console.log(validationError)
                    return {
                        ...state,
                        authResponse: authResponse,
                        styleLoginButton: 'alert-error-login',
                        validationError: validationError
                    }
                } else {
                    return {
                        ...state,
                        authResponse: 'Try again in few minutes',
                        styleLoginButton: 'alert-error-login',
                    }
                }
            }

        case 'AUTH_USER_LS':
            return {
                ...state,
                authResponse: null,
                token: true,
                styleLoginButton: null,
                userInfo: action.payload
            }

        case 'SIGN_OUT':
            localStorage.removeItem('token')
            return {
                ...state,
                token: null,
                userInfo: null,
                responseAPI: null,
                styleLoginButton: null
            } 

        default:
            return state
    }
}

export default authReducer