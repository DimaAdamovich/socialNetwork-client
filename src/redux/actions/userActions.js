import {
    CLEAR_ERRORS,
    LOADING_UI,
    LOADING_USER, MARK_NOTIFICATIONS_READ,
    SET_ERRORS,
    SET_UNAUTHENTICATED,
    SET_USER, STOP_LOADING_UI,
    UNLOADING_USER
} from "../types";
import axios from "axios";
import {getScreams} from "./dataActions";

export const loginUser = (userData) => (dispatch) => {
    dispatch({type: LOADING_UI})
    axios.post('/login', userData)
        .then(res => {
            setAuthorizationToken(res.data.token)
            dispatch(getUserData())
            dispatch({
                type: CLEAR_ERRORS
            })
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const logout = () => dispatch => {
    dispatch({type: SET_UNAUTHENTICATED})
    localStorage.removeItem('FBIdToken')
    delete axios.defaults.headers.common['Authorization']
}

export const signUpUser = (newUserData) => (dispatch) => {
    dispatch({type: LOADING_UI})
    axios.post('/signup', newUserData)
        .then(res => {
            setAuthorizationToken(res.data.token)
            dispatch(getUserData())
            dispatch({
                type: CLEAR_ERRORS
            })
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        })
}

export const getUserData = () => dispatch => {
    dispatch({type: LOADING_USER})
    axios.get('/user')
        .then(res => {
            dispatch({
                type: SET_USER,
                payload: res.data
            })
            dispatch({type: STOP_LOADING_UI})
        })
        .catch(err => {
            dispatch({type: UNLOADING_USER})
            return console.error(err)})
}

const setAuthorizationToken = token => {
    const FBIdToken = `Bearer ${token}`
    localStorage.setItem('FBIdToken', FBIdToken)
    axios.defaults.headers.common['Authorization'] = FBIdToken
}

export const uploadImage = formData => dispatch => {
    // dispatch({type: LOADING_USER})
    axios.post('/user/image', formData)
        .then(() => {
            dispatch(getUserData())
            setTimeout(()=>{
                dispatch(getScreams())
            }, 2000)

        })
        .catch(err => {
            dispatch({type: UNLOADING_USER})
            console.error(err)
        })
}
export const editUserDetails = userDetails => dispatch => {
    dispatch({type: LOADING_USER})
    axios.post('/user', userDetails)
        .then(() => dispatch(getUserData()))
        .catch(err => {
            dispatch({type: UNLOADING_USER})
            console.error(err)
        })
}

export const markNotificationsRead = notificationsIds => dispatch => {
    axios.post('/notifications', notificationsIds)
        .then(() =>{
            dispatch({
                type: MARK_NOTIFICATIONS_READ
            })
        })
        .then(err => console.error(err))
}