import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import UserReducer from './user/UserReducers'
import ContactReducer from './contact/ContactReducers'

const rootReducer = combineReducers({
    user: UserReducer,
    contact: ContactReducer
})

const store = createStore(
    rootReducer,
    applyMiddleware(thunk))

export default store;