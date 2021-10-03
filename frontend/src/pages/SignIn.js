import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import authActions from '../redux/actions/authActions'
import {connect} from 'react-redux'
import { GoogleLogin } from 'react-google-login'

const SignIn = (props) => {
    document.title = 'Sign In | MyTinerary'

    const [loginUser, setLoginUser] = useState({ email: '', password: ''})    

    const inputHandler = (e) => {
        setLoginUser({
            ...loginUser,
            [e.target.name]: e.target.value
        })
    }

    const [render, setRender] = useState(false)

    useEffect( () => {
        setRender(false)
    }, [])

    const newUserSubmit = () => {
        setRender(true)
        props.logInUser(loginUser)
        setLoginUser({ email: '', password: ''})
    }

    const [turndisabled, setTurnDisabled] = useState(true)

    if (turndisabled && (loginUser.email && loginUser.password)) {
        setTurnDisabled(false)
    }
    
    if (!turndisabled && (!loginUser.email || !loginUser.password)) {
        setTurnDisabled(true)
    }

    const responseGoogle = res => {
        let loginUserGoogle = {
            email: res.profileObj.email,
            password: res.profileObj.googleId,
            flagGoogle: true
        }
        setRender(true)
        props.logInUser(loginUserGoogle)

    }

    return (
        <div className="auth-container">
            <div className="form-container">
                <form>
                    <p className="title-login">¡Hello! Enter your e-mail and your password to continue</p>
                    <div className="input-container">
                        <label>Email</label>
                        <input 
                            type="email"  
                            placeholder="user@email.com"
                            name="email"
                            value={loginUser.email}
                            onChange={inputHandler}
                        ></input>                                     
                    </div>
                    <div className="input-container">
                        <label>Password</label>
                        <input 
                            type="password"
                            name="password"
                            value={loginUser.password}
                            onChange={inputHandler}
                        ></input>
                    </div>                                   
                </form>
                <div className="buttons-form-container">
                    {(render && props.authResponse) && <button disabled className={props.styleResponse}>{props.authResponse}</button>}
                    {turndisabled && <button className="button-disabled">Sign In</button>}
                    {!turndisabled && <button className="button-login" onClick={newUserSubmit}>Sing in</button>}
                    <GoogleLogin
                        clientId="478587460975-giu0a4b1k75e7l2j3otss7oevhdccfdu.apps.googleusercontent.com"
                        buttonText="Sign in with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        className="google-signin"
                    />
                    <div className="change-page-login">
                        <p>New to MyTinerary?</p>
                        <Link to="/signup">
                            <p className="button-change-page">Create an account</p>
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
        token: state.authReducer.token
    }
}

const mapDispatchToProps = {
    logInUser: authActions.loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)