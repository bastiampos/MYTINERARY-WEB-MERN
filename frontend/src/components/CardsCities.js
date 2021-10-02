import {Link} from 'react-router-dom'

const CardsCities = ({cities}) => {

    return (
        <>
            <div className="cards-cities-container">
                {cities && cities.map( city => {
                    return (
                            <Link key={city._id} exact="true" to={`/info-city/${city._id}`}>
                                <div className="card-city-container">
                                    <div className="img-card-city-cities" style={{backgroundImage:`url("./assets/${city.src}")`}}>
                                        <div className="alert-popular-city">
                                            <p>{ city.mostVisited && 'Popular destination' }</p>    
                                        </div>
                                        <div className="cssarrow"></div>
                                    </div>
                                    <div className="info-card-city-cities">
                                        <div>
                                            <p className="name-city-card-cities">{city.name}</p>
                                            <p className="country-city-card-cities">{`City in ${city.country}`}</p>
                                        </div>
                                        <button>
                                            {`${city.totalItineraries} `}{ city.totalItineraries > 1 ? 'itineraries >' : 'itinerary >'}
                                        </button>
                                    </div>
                                </div>
                            </Link> 
                    )
                })}
            </div>
        </>
    )
}

export default CardsCities