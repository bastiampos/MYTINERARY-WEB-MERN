import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import authActions from '../redux/actions/authActions'
import {connect} from 'react-redux'
import { GoogleLogin } from 'react-google-login'

const SignUp = (props) => {

    document.title = 'Sign Up | MyTinerary'

    const countries = ['Argentina', 'China', 'Colombia', 'England', 'France', 'Italy', 'Japan', 'Mexico', 'Spain', 'United States']
    const {validationError} = props

    const [newUser, setNewUser] = useState({
        name: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        photoUrl: '',
        country: ''
    })

    const [turndisabled, setTurnDisabled] = useState(true)

    const inputHandler = (e) => {
        setNewUser({
            ...newUser,
        [e.target.name]: e.target.value
        })
    }

    if (turndisabled && (newUser.name && newUser.lastname && newUser.username && newUser.email && newUser.password && newUser.country)) {
        setTurnDisabled(false)
    }
    
    if (!turndisabled && (!newUser.name || !newUser.lastname || !newUser.username || !newUser.email || !newUser.password || !newUser.country)) {
        setTurnDisabled(true)
    }

    useEffect( () => {
        setRender(false)
    }, [])

    const [render, setRender] = useState(false)

    const sendNewUserSubmit = () => {
        setRender(true)
        props.addNewUser(newUser)
        setNewUser({
            name: '',
            lastname: '',
            username: '',
            email: '',
            password: '',
            photoUrl: '',
            country: ''
        })
    }

    const responseGoogle = res => {
        let newUserGoogle = {
            name: res.profileObj.givenName,
            lastname: res.profileObj.familyName,
            username: res.profileObj.givenName,
            email: res.profileObj.email,
            photoUrl: res.profileObj.imageUrl,
            password: res.profileObj.googleId,
            country: 'Google',
            google: true
        }
        setRender(true)
        props.addNewUser(newUserGoogle)
    }
    
    return (
        <div className="auth-container">
                <div className="form-container">
                    <form>
                        <p className="title-login signout">Fill in your details</p>
                        <div className="row-form-signout name">
                            <div className="input-container-signout">
                                <label>Name</label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={newUser.name}
                                    onChange={inputHandler}
                                    className={`${((render && validationError) && validationError.firstname) ? 'border-red' : 'border-gray'}`}
                                />
                                {(render && validationError) && <p className="error-input">{validationError.firstname}</p>}
                            </div>
                            <div className="input-container-signout">
                                <label>Last name</label>
                                <input 
                                    type="text" 
                                    name="lastname" 
                                    value={newUser.lastname}
                                    onChange={inputHandler}
                                    className={`${((render && validationError) && validationError.lastname) ? 'border-red' : 'border-gray'}`}
                                />    
                                {(render && validationError) && <p className="error-input">{validationError.lastname}</p>}
                            </div>
                            <div className="input-container-signout">
                                <label>Username</label>
                                <input 
                                    type="text" 
                                    name="username"
                                    value={newUser.username}
                                    onChange={inputHandler}
                                    className={`${((render && validationError) && validationError.username) ? 'border-red' : 'border-gray'}`}
                                />
                                {(render && validationError) && <p className="error-input">{validationError.username}</p>}   
                            </div>
                        </div>
                        <div className="row-form-signout">
                            <div className="input-container-signout">
                                <label>Email</label>
                                <input 
                                    type="email" 
                                    placeholder="user@email.com" 
                                    name="email"
                                    value={newUser.email}
                                    onChange={inputHandler}
                                    className={`${((render && validationError) && validationError.email) ? 'border-red' : 'border-gray'}`}
                                />
                                {(render && validationError) && <p className="error-input">{validationError.email}</p>}   
                            </div>
                            <div className="input-container-signout">
                                <label>Password</label>
                                <input 
                                    type="password" 
                                    name="password"
                                    value={newUser.password}
                                    onChange={inputHandler}
                                    className={`${((render && validationError) && validationError.password) ? 'border-red' : 'border-gray'}`}
                                />
                                {(render && validationError) && <p className="error-input">{validationError.password}</p>}   
                            </div>
                        </div>
                        <div className="row-form-signout">
                            <div className="input-container-signout">
                                <label>Photo</label>
                                <input 
                                    type="text" 
                                    name="photoUrl"
                                    value={newUser.photoUrl}
                                    onChange={inputHandler}
                                    className={`${((render && validationError) && validationError.photoUrl) ? 'border-red' : 'border-gray'}`}
                                /> 
                                {(render && validationError) && <p className="error-input">{validationError.photoUrl}</p>} 
                            </div>
                            <div className="input-container-signout">
                                <label>Country</label>
                                <select 
                                    name="country" 
                                    onChange={inputHandler} 
                                    className={`${((render && validationError) && validationError.country) ? 'border-red' : 'border-gray'}`}
                                >
                                    <option value=''>Country</option>
                                    {countries.map( (country, index) => (
                                        
                                        <option key={index} value={country}>{country}</option>
                                    ))}
                                </select>
                                {(render && validationError) && <p className="error-input">{validationError.country}</p>}
                            </div>
                        </div>
                    </form>

                    <div className="buttons-form-container">
                        {(render && props.authResponse) 
                            && <button disabled className={props.styleResponse}>{props.authResponse}</button>}
                        {turndisabled && <button className="button-disabled signout">Sign Up</button>}
                        {!turndisabled && <button className="button-login signout" onClick={sendNewUserSubmit}>Sign Up</button>}
                        <GoogleLogin
                            clientId="478587460975-dj2770atk55b2e7tnrtj6mip2ii1qaf0.apps.googleusercontent.com"
                            buttonText="Create account with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            className="google-signup"
                        />
                        <div className="change-page-login">
                            <p>Already have an account?</p>
                            <Link to="/signin">
                                <p className="button-change-page">Sign in</p>
                            </Link>
                        </div>
                    </div>
                </div>  
            </div>
    )
}

const mapStateToProps = (state) => {
    return {
        authResponse: state.authReducer.authResponse,
        styleResponse: state.authReducer.styleLoginButton,
        validationError: state.authReducer.validationError,
        token: state.authReducer.token
    }
}

const mapDispatchToProps = {
    addNewUser: authActions.addNewUser
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp)