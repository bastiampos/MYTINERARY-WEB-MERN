import { useEffect, useState } from "react"
import axios from "axios"
import { connect } from "react-redux"
import ItineraryComment from '../components/ItineraryComment'

const Itinerary = ({itinerary, userId, token}) => {

    const [showActivities, setShowActivities] = useState(false)
    const [activities, setActivities] = useState([])
    const [valueNewComment, setValueNewComment] = useState('')
    const [comments, setComments] = useState([])

    const [likes, setLikes] = useState([])
    const [likeIcon, setLikeIcon] = useState(null)

    const changeViewMore = () => {
        !showActivities ? setShowActivities(true) : setShowActivities(false)
    }

    const handleValue = (e) => {
        setValueNewComment(e.target.value)
    }

    const sendNewComment = () => {

        if(valueNewComment) {
            axios.post(
                `https://mytinerary-bastiampos.herokuapp.com/api/comments/${itinerary._id}`, 
                {
                    userId: userId._id,
                    comment: valueNewComment
                },
                {headers: {Authorization: "Bearer " + token}}
            )
                .then( res => {
                    if(res.data.success) {
                        setComments(res.data.response)
                        setValueNewComment('')
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    useEffect( () => {
        axios.get(`https://mytinerary-bastiampos.herokuapp.com/api/activities/${itinerary._id}`)
                .then( res => {
                    setActivities(res.data.response)
                })
                .catch(error => {
                    console.log(error)
                })     
    }, [showActivities])

    useEffect( () => {
        setComments(itinerary.comments)
        setLikes(itinerary.likes)   
    }, [])

    useEffect( () => {
        (token) && likes.includes(userId._id) ? setLikeIcon(true) : setLikeIcon(false)    
    }, [likes, token])

    const newLike = () => {  
        if(token) {
            axios.post(
                `https://mytinerary-bastiampos.herokuapp.com/api/likes/${itinerary._id}`, 
                {userId: userId._id},
                {headers: {Authorization: "Bearer " + token}}
            )
                .then( res => {
                    setLikes(res.data.response)
                    setLikeIcon(true)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    const deleteLike = () => {
        if (token) {
            axios.post(
                `https://mytinerary-bastiampos.herokuapp.com/api/deletelike/${itinerary._id}`, 
                {userId: userId._id},
                {headers: {Authorization: "Bearer " + token}}
            )
                .then( res => {
                    let likesToSave = likes.filter( like => {
                        return like !== userId._id
                    })
                    setLikes(likesToSave)
                    setLikeIcon(false)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    const [likeMessage, setLikeMessage] = useState(false)
    const showLikeMessage = () => {
        setLikeMessage(true)
        setTimeout( () => {
            setLikeMessage(false)
        }, 1000)
    }

    return (
        <div key={itinerary._id} className="itinerary-main-container">
            <div className="itinerary-container">
                <div className="img-itinerary" style={{backgroundImage: `url("/assets/${itinerary.src}")`}}>
                    <h6 className="name-itinerary">{itinerary.name}</h6>
                </div>
                <div className="right-side-itinerary">
                    <div className="author-itinerary-container">
                        <div 
                            className="img-author-itinerary" 
                            style={{backgroundImage: `url("/assets/${itinerary.author.src}")`}}
                        >
                        </div>
                        <p className="name-author-itinerary">{itinerary.author.name} {itinerary.author.lastname}</p>


                        <div className="like-container">

                            {!token && 
                                <svg onClick={showLikeMessage} className="like-icon-itinerary" xmlns="http://www.w3.org/2000/svg"  fill="currentColor" viewBox="0 0 16 16">
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                                    />
                                </svg>}
                            {(token && !likeIcon) && 
                                <svg onClick={newLike} className="like-icon-itinerary" xmlns="http://www.w3.org/2000/svg"  fill="currentColor" viewBox="0 0 16 16">
                                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                                    />
                                </svg>}
                                
                            { (token && likeIcon) &&
                                <svg onClick={deleteLike} className="like-icon-itinerary" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                                    />
                                </svg>}
                            <p>{likes.length}</p>
                            {(!token && likeMessage) && <p className="error-like">You must be logged in to like</p>}
                        </div>
                    </div>
                    <p className="description-itinerary">{itinerary.description}</p>

                    <div className="hashtags-container">
                        {itinerary.hashtags.map( (hashtag, index) => <a key={index} href={`https://twitter.com/hashtag/${hashtag}`} target="_blank">#{hashtag}</a>)}
                    </div>

                    <div className="price-container">
                        <p className="bold-p">Price:</p> 
                        {Array.from({ length: itinerary.price }, (_, index) => <div key={index} className="price-icon-itinerary" style={{backgroundImage: 'url("/assets/dolar.svg")'}}></div>)}
                    </div>

                    <p className="bold-p">Duration: <span>{itinerary.duration} hours</span></p>
                    {!showActivities && <div className="viewmore-button-itinerary">
                        <button onClick={changeViewMore}>{showActivities ? 'View Less' : 'View More'}</button>
                    </div>}
                </div>
            </div>

            {showActivities && 
                <div className="activities-main-container">
                    <div className="activities-container">
                        <h6>Activities</h6>
                        <div className="activity-container">
                            {activities.map( activity => (
                                (activity.itineraryId === itinerary._id) && <div 
                                    key={activity._id} 
                                    className="img-activity" 
                                    style={{backgroundImage: `url("${activity.src}")`}}
                                >
                                    <p className="nombre-activity">{activity.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="comments-box-container">
                        <h6>Comments</h6>
                        <div className="comments-main-container">
                            <div className="comments-container">
                                {(comments) && comments.map( comment => (
                                    <ItineraryComment 
                                        key={comment._id}
                                        comment={comment} 
                                        userId={userId} 
                                        token={token}
                                        itineraryId={itinerary._id}
                                    />
                                ))}

                            </div>
                            <div className="writting-comments" >
                                <input 
                                    onChange={handleValue}
                                    disabled={!token ? true : false}
                                    type="text"
                                    value={valueNewComment}
                                    placeholder={token ? "Write a comment..." : "You must be logged in to comment."}
                                />
                                <svg onClick={sendNewComment} xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="send-comment-icon" viewBox="0 0 16 16">
                                    <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0zm-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11.5z"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>}
            {showActivities && <div className="viewmore-button-itinerary opened">
                <button onClick={changeViewMore}>{showActivities ? 'View Less' : 'View More'}</button>
            </div>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userId: state.authReducer.userInfo,
        token: state.authReducer.token
    }
}

export default connect(mapStateToProps)(Itinerary)