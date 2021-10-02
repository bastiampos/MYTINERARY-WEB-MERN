import {useState} from 'react'
import axios from 'axios'

const ItineraryComment = ({comment, userId, token, itineraryId}) => {

    const [edit, setEdit] = useState(false)
    const [disabledInput, setDisableInput] = useState(true)
    const [valueComment, setValueComment] = useState('')
    const [deleteIcon, setDeleteIcon] = useState(false)
    const [commentDeleted, setCommentDeleted] = useState(false)

    const handleValue = (e) => {
        setValueComment(e.target.value)
    }

    const editComment = () => {
        setEdit(true)
        setDisableInput(false)
    }

    const saveComment = () => {
        token && axios.post(
            `https://mytinerary-scampos.herokuapp.com/api/editcomment/${itineraryId}`, 
            {
                _id: comment._id,
                userId: userId,
                comment: valueComment
            },
            {headers: {Authorization: "Bearer " + token}}
        )
            .then( res => {})
            .catch(error => {
                console.log(error)
            })
        setEdit(false)
        setDisableInput(true)
    }

    const deleteComment = () => {
        let data = comment._id
        token && axios.post(
            `https://mytinerary-scampos.herokuapp.com/api/deletecomment/${itineraryId}`, 
            {commentId: data},
            {headers: {Authorization: "Bearer " + token}}
        )
            .then( res => {})
            .catch(error => {
                console.log(error)
            })
        setCommentDeleted(true)
        setDeleteIcon(false)
    }

    const deleteState = () => {
        setDeleteIcon(true)
    }

    const deny = () => {
        setEdit(false)
        setDisableInput(true)
        setDeleteIcon(false)
    }

    return (
        <div key={comment._id} className="row-comment" style={{display: commentDeleted && 'none'}}>
            <div className="img-user-comment-container">
                <div
                    className="img-user-comment"
                    style={{backgroundImage: `url("${comment && comment.userId.photoUrl}")`}}
                >
                </div>
            </div>
            <div className="comment-name-edit-delete">
                {comment && <p>{comment.userId.name} {comment.userId.lastname}</p>}
                <div style={{display: 'flex'}} className="comment-container">
                    <input 
                        onChange={handleValue}
                        disabled={disabledInput}
                        className="comment-input" 
                        type="text" 
                        defaultValue={comment.comment}
                    />
                    {(userId && (userId._id === comment.userId._id)) &&
                        <div className="comment-icons">
                            <div style={{display: "flex"}}>
                                {!edit && <svg xmlns="http://www.w3.org/2000/svg" onClick={editComment} fill="currentColor" className="edit-icon" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                </svg>}                         
                                {edit && <svg xmlns="http://www.w3.org/2000/svg" onClick={saveComment} fill="currentColor" className="check-icon"viewBox="0 0 16 16">
                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                </svg>}
                                {edit && <svg xmlns="http://www.w3.org/2000/svg" onClick={deny} fill="currentColor"className="x-icon" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>}
                            </div>


                            <div style={{display: "flex"}}>
                                {!deleteIcon && <svg xmlns="http://www.w3.org/2000/svg" onClick={deleteState} fill="currentColor" className="delete-icon" viewBox="0 0 16 16">
                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                </svg>}
                                {deleteIcon && <svg xmlns="http://www.w3.org/2000/svg" onClick={deleteComment} fill="currentColor" className="check-icon"viewBox="0 0 16 16">
                                    <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
                                </svg>}
                                {deleteIcon && <svg xmlns="http://www.w3.org/2000/svg" onClick={deny} fill="currentColor"className="x-icon" viewBox="0 0 16 16">
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>}
                            </div>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default ItineraryComment

