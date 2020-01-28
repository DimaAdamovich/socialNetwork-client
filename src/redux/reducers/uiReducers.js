import { SET_ERRORS, CLEAR_ERRORS, LOADING_UI, STOP_LOADING_UI} from "../types";

const initialState = {
    loading: false,
    errors: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ERRORS:
            return {
                ...state,
                errors: action.payload,
                loading: false
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                errors: {}
            }
        case LOADING_UI:
            return {
                ...state,
                loading: true
            }
        case STOP_LOADING_UI:
            return {
                ...state,
                loading: false
            }

        default: return state


    }
}