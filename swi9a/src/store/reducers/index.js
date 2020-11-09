import { combineReducers } from 'redux';
import basketReducer from './basketReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import categoryReducer from './categoryReducer';
import productReducer from './productReducer';
import initialDataReducer from './initialDataReducer';

export default combineReducers({
    basket: basketReducer,
    error: errorReducer,
    auth: authReducer,
    categories:categoryReducer,
    initialData:initialDataReducer,
    product:productReducer
});

