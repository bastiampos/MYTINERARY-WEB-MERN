import { NavLink } from "react-router-dom"

const NotFound = () => {
    document.title = 'MyTinerary: Page not found'
    return (
        <div className="mainNF">
            <div>
                <h1>Ooops...</h1>
                <p>Looks like you went the wrong way.</p>
                <p>Let's get you back on the right path.</p>
                <NavLink to="/">
                    <button>Go to Home</button>
                </NavLink>
            </div>
            <img className="notFound" src="/assets/error404person.png" alt="error404" />
        </div>
    )
}

export default NotFound
