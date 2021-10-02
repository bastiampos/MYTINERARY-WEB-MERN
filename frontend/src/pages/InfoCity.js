import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import CardCity from '../components/CardCity'
import HeroCities from '../components/HeroCities'
import Itinerary from '../components/Itinerary'
import { connect } from 'react-redux'
import citiesActions from '../redux/actions/citiesActions'
import itinerariesActions from '../redux/actions/itinerariesActions'

const InfoCity = (props) => {
    const [loading, setLoading] = useState(true)

    useEffect( () => {
        props.getCityById(props.match.params.id)
        props.getItineraries(props.match.params.id)
        setLoading(false)
        localStorage.setItem('cityId', props.match.params.id)
        
        if(!props.city) {
            props.history.push("/cities")
        }

    }, [])


    return (
        <div className="main-infocity">
            <div className="line-infocity"></div>

            {props.city ? <CardCity city={props.city}/> : <h2 className="noCity">There isn't a city here</h2>}

            {(props.itineraries && props.city) && 
                <div className="main-itineraries-container">
                <div className="itineraries-container">
                    {(props.itineraries.length > 0) ? props.itineraries.map( itinerary => 
                    <Itinerary key={itinerary._id} itinerary={itinerary} />) : <p className="noItineraries">There aren't itineraries for this city</p>}
                </div>
            </div>
            }
            

            <div className="buttons-infocity">
                <Link className="gotocities-container" to="/cities">
                    <button className="button-gotocities-infocity">{'<'} Go to Cities</button>
                </Link>
                <Link className="gotocities-container" to="/">
                    <button className="button-gotocities-infocity">{'<'} Go to Home</button>
                </Link>
            </div>
        </div> 
    )
}

const mapStateToProps = (state) => {
    return {
        city: state.citiesReducer.chosenCity,
        itineraries: state.itinerariesReducer.allItineraries,
    }
}

const mapDispatchToProps = {
    getCityById: citiesActions.getCityById,
    getItineraries: itinerariesActions.getItineraries,
}

export default connect(mapStateToProps, mapDispatchToProps)(InfoCity)