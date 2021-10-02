import axios from "axios"

const citiesActions = {
    getCities: (token) => {
        return (dispatch, getState) => {
            axios.get('https://mytinerary-bastiampos.herokuapp.com/api/cities', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            })
                .then( res =>  dispatch( {type: 'GET_ALL_CITIES', payload: res.data.response} ))
                .catch( error =>  console.log(error))
        }
    },

    searchCities: (inputValue) => {
        return (dispatch, getState) => {
            dispatch( {type: 'SEARCHED_CITIES', payload: inputValue} )
        }
    },
    
    getCityById: (cityId) => {
        return (dispatch, getState) => {
            dispatch( {type: 'GET_CITY_BY_ID', payload: cityId} )
        }
    }
}

export default citiesActions