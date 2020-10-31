import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import combineReducers from './reducers'

const initialState ={}


const store= createStore(combineReducers, initialState, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));

export default store;