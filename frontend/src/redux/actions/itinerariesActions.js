import axios from "axios"

const itinerariesActions = {
    getItineraries: (cityId) => {
        return (dispatch, getState) => {
            axios.get(`https://mytinerary-scampos.herokuapp.com/api/itineraries/${cityId}`)
                .then( res => {
                    dispatch( {type: 'GET_ALL_ITINERARIES', payload: res.data.response} )
                })
                .catch( error => console.log(error))
        }
    },
    newComment: (itineraryId, token, userId) => {
        return () => {
            if(token) {
                axios.post(
                    `https://mytinerary-scampos.herokuapp.com/api/likes/${itineraryId}`, 
                    {userId: userId},
                    {headers: {Authorization: "Bearer " + token}}
                )
                    .then( res => { return res.data.response })
                    .catch(error => {console.log(error.message)})
            }
        }
    },
    editComment: (token, userId, valueComment, commentId, itineraryId) => {
        return () => {
            axios.post(
                `https://mytinerary-scampos.herokuapp.com/api/editcomment/${itineraryId}`, 
                {
                    _id: commentId,
                    userId: userId,
                    comment: valueComment
                },
                {headers: {Authorization: "Bearer " + token}}
            )
                .then( res => console.log(res.data))
                .catch(error => {console.log(error)})
        }
    },
    deleteComment: (token, commentId, itineraryId) => {
        return () => {
            token && axios.post(
                `https://mytinerary-scampos.herokuapp.com/api/deletecomment/${itineraryId}`, 
                {commentId: commentId},
                {headers: {Authorization: "Bearer " + token}}
            )
                .then( res => {
                    return res.data.response
                })
                .catch(error => {console.log(error.message)})
            }
    },
    newLike: () => {
        return () => {

        }
    },
    deleteLike: () => {
        return () => {

        }
    },
    
}

export default itinerariesActions