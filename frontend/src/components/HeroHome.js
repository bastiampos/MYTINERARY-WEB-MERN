import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className="hero-home">
            <h2>Find your perfect trip, designed by insiders</h2>
            <h2>who know and love their cities!</h2>
            <div className="button-hero">
                <Link to="/cities">
                    <button>¡Choose your destination!</button>
                </Link>
            </div>
        </div>
    )
}

export default Hero