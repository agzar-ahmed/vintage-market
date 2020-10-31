import { combineReducers } from 'redux';
import basketReducer from './basketReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import categoryReducer from './categoryReducer';

export default combineReducers({
    basket: basketReducer,
    error: errorReducer,
    auth: authReducer,
    categories:categoryReducer
});

