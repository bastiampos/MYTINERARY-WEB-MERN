import CardsCities from "../components/CardsCities"
import { useEffect, useState } from 'react' 
import HeroCities from '../components/HeroCities'
import {connect} from 'react-redux'
import citiesActions from '../redux/actions/citiesActions'
import { Link } from "react-router-dom"

const Cities = (props) => {
    document.title = 'Cities | MyTinerary'

    useEffect( () => {
        window.scrollTo(0,0)
        props.getCities(localStorage.getItem('token'))

    }, [])

    return (
        <div className="main-cities">
            <HeroCities />
            {props.cities.length > 0 && <CardsCities cities={props.cities}/>}
            {(!props.cities.length) &&
                <>
                    <h2 className="noCity">There aren't cities to show you</h2>
                    <Link className="gotocities-container" to="/">
                        <button className="button-gotocities-infocity">{'<'} Go to Home</button>
                    </Link>
                </>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        cities: state.citiesReducer.searchedCities,
    }
}

const mapDispatchToProps = {
    getCities: citiesActions.getCities
}

export default connect(mapStateToProps, mapDispatchToProps)(Cities)


