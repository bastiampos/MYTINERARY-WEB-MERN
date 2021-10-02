import React, { useState } from 'react'
import NavBar from './NavBar'
import HiddenNavBar from '../components/HiddenNavBar'

const Header = () => {
    const [menu, setMenu] = useState(false)

    const showMenu = () => {
            if (!menu) {
            return setMenu(true)
            } else {
            return setMenu(false)
            }
    }

    return (
        <>
            <header> 
                <h1>MyTinerary</h1>
                <div className="navbar-login-container">
                    <NavBar />
                    <svg onClick={showMenu} className="menu-icon-hidden" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                    </svg>
                </div>
            </header>
            {menu && <HiddenNavBar showMenu={showMenu}/>}
        </>
    )
}

export default Header
