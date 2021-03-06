import {
    LIKE_SCREAMS,
    LOADING_USER, MARK_NOTIFICATIONS_READ,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    SET_USER,
    UNLIKE_SCREAMS,
    UNLOADING_USER
} from "../types";

const initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: [],
    loading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            }
        case SET_UNAUTHENTICATED:
            return initialState
        case LOADING_USER:
            return {
                ...state,
                loading: true
            }
        case UNLOADING_USER:
            return {
                ...state,
                loading: false
            }
        case MARK_NOTIFICATIONS_READ:
            state.notifications.forEach(not => not.read = true)
            return {...state, notifications: [...state.notifications]}
        case SET_USER:
            return {
                authenticated: true,
                ...action.payload,
                loading: false
            }
        case LIKE_SCREAMS:
            return {
                ...state,
                likes: [...state.likes, {
                    userHandle: state.credentials.handle,
                    screamId: action.payload.screamId
                }]
            }
        case UNLIKE_SCREAMS:
            return {
                ...state,
                likes: state.likes.filter(like => like.screamId !== action.payload.screamId)
            }
        default:
            return state


    }
}