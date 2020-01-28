import {
    ADD_COMMENT,
    ADD_SCREAM, CLEAR_SCREAM,
    DELETE_SCREAM,
    LIKE_SCREAMS,
    LOADING_DATA,
    SET_SCREAM,
    SET_SCREAMS,
    UNLIKE_SCREAMS
} from "../types";

const initialState = {
    loading: true,
    screams: new Array(5).fill(0),
    scream: null
}
let index
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            }
        case SET_SCREAM:
            return {
                ...state,
                scream: action.payload,
            }
        case CLEAR_SCREAM:
            return {
                ...state,
                scream: null,
            }
        case ADD_SCREAM:
            return {
                ...state,
                screams: [action.payload, ...state.screams],
                loading: false
            }
        case ADD_COMMENT:
            index = state.screams.findIndex(scream => scream.screamId === action.payload.screamId)
            const newScream = {
                ...state.scream,
                comments: [action.payload, ...state.scream.comments],
                commentCount: state.scream.comments.length + 1
            }
            state.screams[index] = newScream
            return {
                ...state,
                screams: [...state.screams],
                scream: newScream
            }
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case LIKE_SCREAMS:
        case UNLIKE_SCREAMS:
            index = state.screams.findIndex(scream => scream.screamId === action.payload.screamId)
            state.screams[index] = {...state.screams[index], ...action.payload}
            if (state.scream && state.scream.screamId === action.payload.screamId) {
                state.scream = {...state.scream, ...action.payload}
            }
            return {...state, screams: [...state.screams]}
        case DELETE_SCREAM:
            return {
                ...state,
                screams: state.screams.filter(scream => scream.screamId !== action.payload)
            }

        default:
            return state
    }
}