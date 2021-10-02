import {connect} from 'react-redux'
import citiesActions from '../redux/actions/citiesActions'

const HeroCities = (props) => {
    
    return (
        <div className="hero-cities-container" style={{backgroundImage: 'url("/assets/heroCities.jpg")'}}>
            <h2>Discover the World</h2>
            {<input onChange={(e) => props.searchValue(e.target.value)} className="search-bar-cities" type="search"  placeholder="Search your next destination"/> }
        </div>
    )
}

const mapDispatchToProps = {
    searchValue: citiesActions.searchCities
}

export default connect(null, mapDispatchToProps)(HeroCities)
