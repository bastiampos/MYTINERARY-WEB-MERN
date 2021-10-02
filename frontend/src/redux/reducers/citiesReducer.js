
const citiesReducer = ( state= {allCities: [], searchedCities: [], chosenCity: {}}, action) => {
    switch (action.type) {
        case 'GET_ALL_CITIES': 
            return {
                ...state,
                allCities: action.payload, 
                searchedCities: action.payload,
            }
            
        case 'SEARCHED_CITIES':
            return {
                ...state,
                searchedCities: state.allCities.filter(city => city.name.replace(/ /g, "").toUpperCase().startsWith(action.payload.replace(/ /g, "").toUpperCase()))
            }
        case 'GET_CITY_BY_ID':
            return {
                ...state,
                chosenCity: state.allCities.find(city => city._id == action.payload)
            }

        default:
            return state
    }
}

export default citiesReducer