import {NavLink, Link} from 'react-router-dom'
import { connect } from "react-redux"
import authActions from "../redux/actions/authActions"

const HiddenNavBar = (props) => {
    const {userInfo, signOut, showMenu} = props
    return (
        <nav className="hidden-navbar-container">

            <div className="login-container-mobile">
                <div className="login-welcome-container">
                    <div className="login-welcome">
                        {(!props.token || !userInfo.photoUrl) && <svg className="perfil-photo-user-mobile" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>} 
                        {(props.token && userInfo.photoUrl) &&
                            <div className="perfil-photo-user-mobile img" style={{backgroundImage: `url("${(userInfo.photoUrl)}")`}}></div>}
                    </div>
                    <div>
                        {(props.token && userInfo.name) 
                            ? <p className="welcome-mobile">{`Welcome, ${userInfo.name}`}</p> 
                            : <p  className="welcome-mobile">Welcome</p>}
                        <p className="descp-welcome-mobile">Login to your account to react and comment on each itinerary</p>
                    </div>
                </div>
                <div className="login-mobile-container"> 
                    {!props.token && 
                        <Link to="/signin" className="button-login-mobile-container" onClick={showMenu}>
                            <button className="button-login-mobile signin">Sign In</button>
                        </Link>
                    }
                    {!props.token && 
                        <Link to="/signup" className="button-login-mobile-container" onClick={showMenu}>
                            <button className="button-login-mobile signup">Sign Up</button>
                        </Link>
                    }
                    {props.token && <button className="button-login-mobile logged">Settings</button>}
                    {props.token && <button className="button-login-mobile logged" onClick={signOut}>Sign out</button>}
                </div>
            </div>



            <Link to="/" className="navbar-item-mobile" onClick={showMenu}>    
                <svg className="menu-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5z"/>
                </svg>                
                <p>Home</p>                            
            </Link>
            <Link to="/cities" className="navbar-item-mobile" onClick={showMenu}>              
                <svg className="menu-icon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"/>
                    <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"/>
                </svg>
                <p>Cities</p>                            
            </Link>
        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        token: state.authReducer.token,
        userInfo: state.authReducer.userInfo
    }
}

const mapDispatchToProps = {
    signOut: authActions.signOut
}

export default connect(mapStateToProps, mapDispatchToProps)(HiddenNavBar)