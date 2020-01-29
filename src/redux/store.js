import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import userReducers from './reducers/userReducers'
import uiReducers from './reducers/uiReducers'
import dataReducers from './reducers/dataReducers'

const reducers = combineReducers({
    user: userReducers,
    data: dataReducers,
    UI: uiReducers
})

const initialState = {}
const store = createStore(
    reducers, initialState,applyMiddleware(thunk)

    // compose(applyMiddleware(thunk),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)

export default store