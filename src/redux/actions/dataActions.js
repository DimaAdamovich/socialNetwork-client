import {
    ADD_SCREAM,
    DELETE_SCREAM,
    LIKE_SCREAMS,
    LOADING_DATA,
    LOADING_UI,
    SET_SCREAMS,
    UNLIKE_SCREAMS,
    STOP_LOADING_UI, SET_SCREAM, ADD_COMMENT, CLEAR_SCREAM
} from "../types";
import axios from 'axios'

export const getScreams = () => dispatch => {
    dispatch({type: LOADING_DATA})
    axios.get('/screams')
        .then(res => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_SCREAMS,
                payload: []
            })
            console.error(err)
        })
}
export const getScream = screamId => dispatch => {
    dispatch({
        type: LOADING_UI
    })
    axios.get(`/scream/${screamId}`)
        .then(res => {
            dispatch({
                type: SET_SCREAM,
                payload: res.data
            })
            dispatch({
                type: STOP_LOADING_UI
            })
        })
        .catch(err => {
            dispatch({type: STOP_LOADING_UI})
            console.error(err)
        })
}
export const postScream = newScream => dispatch => {
    dispatch({
        type: LOADING_UI
    })
    axios.post('/scream', newScream)
        .then(res => {
            dispatch({
                type: ADD_SCREAM,
                payload: res.data
            })
            dispatch({
                type: STOP_LOADING_UI
            })
        })
        .catch(err => {
            dispatch({
                type: STOP_LOADING_UI
            })
            console.error(err)})
}
export const postScreamWithImg = ({formData, body}) => dispatch => {
    dispatch({
        type: LOADING_UI
    })
    const newScream = {body}
    axios.post('/image', formData)
        .then(res=> {
            newScream.imageUrl = res.data
        })
        .then(() => {
            axios.post('/screamImg', newScream)
                .then(res => {
                    dispatch({
                        type: ADD_SCREAM,
                        payload: res.data
                    })
                    dispatch({
                        type: STOP_LOADING_UI
                    })
                })
        })

        .catch(err => {
            dispatch({
                type: STOP_LOADING_UI
            })
            console.error(err)})
}
export const likeScream = (screamId) => dispatch => {
    axios.get(`/scream/${screamId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_SCREAMS,
                payload: res.data
            })
        })
        .catch(err => console.error(err))
}
export const unlikeScream = (screamId) => dispatch => {
    axios.get(`/scream/${screamId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_SCREAMS,
                payload: res.data
            })
        })
        .catch(err => console.error(err))
}

export const deleteScream  = screamId => dispatch => {
    dispatch({
        type: LOADING_UI
    })
    axios.delete(`/scream/${screamId}`)
        .then(res => {
            dispatch({
                type: DELETE_SCREAM,
                payload: screamId
            })
            dispatch({
                type: STOP_LOADING_UI
            })
        })
        .catch(err => {
            dispatch({
                type: STOP_LOADING_UI
            })
            console.error(err)})
}
export const clearScream = () => dispatch => {
    dispatch({type: CLEAR_SCREAM})
}
export const commentScream = ({screamId, body}) => dispatch=> {
    axios.post(`/scream/${screamId}/comment`, {body})
        .then(res =>
            dispatch({
                type: ADD_COMMENT,
                payload: res.data
            })
        )
        .catch(err=>console.error(err))
}

export const getUserData = (userHandle) => dispatch => {
    dispatch({type: LOADING_DATA})
    axios.get(`/users/${userHandle}`)
        .then(res => {
            dispatch({
                type: SET_SCREAMS,
                payload: res.data.screams
            })
        })
        .catch(err => {
            dispatch({
                type: SET_SCREAMS,
                payload: []
            })
            console.error(err)
        })
}
