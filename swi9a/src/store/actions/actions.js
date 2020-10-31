import { ADD_TO_BASKET } from "./types";
import { DELETE_FROM_BASKET } from "./types";
import { CLEAR_BASKET } from "./types";
import { GET_ERRORS, CLEAR_ERRORS}from './types';
import axios from 'axios' ;
import {
USER_LOADED,
USER_LOADING,
AUTH_ERROR,
LOGIN_SUCCESS,
LOGIN_FAIL,
LOGOUT_SUCCESS,
REGISTER_SUCCESS,
REGISTER_FAIL,
}from './types';


export function addToBasket(productInfo,quantity){
    return{
             type: ADD_TO_BASKET,
             productInfo,
             quantity
         }
 }
export function deleteFromBasket(id){
    return{
             type: DELETE_FROM_BASKET,
             id           
         }
 }
export function clearBasket(){
    return{
             type: CLEAR_BASKET       
         }
 }

 //RETURN ERRORS
export const returnErrors = (msg, status, id=null) => {
    return {
        type: GET_ERRORS,
        payload: {msg, status, id}
    };
};
 
//clear errors
export const clearErrors = () => {
    return{
        type: CLEAR_ERRORS
    };
};
 
// check token and load user
export const loadUser = () => (dispatch, getState) => {
    //user loading
    dispatch({ type: USER_LOADING });

    return axios.get('http://localhost:5000/api/auth/user', tokenConfig(getState))
     .then(res => dispatch({
         type: USER_LOADED,
         payload: res.data
        }))
     .catch(err => {
         dispatch(returnErrors(err.response.data, err.response.status));
         dispatch({
             type: AUTH_ERROR
         });
     });  
};

//Register User
export const register = ({ name, email ,password }) => dispatch =>{
    //headers
    const config ={
        headers :{'Content-Type':'application/json'}
    }

    //Request body
    const body = JSON.stringify({ name, email, password})

    return axios.post('http://localhost:5000/api/users',body, config)
    .then(res => dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    }))
    .catch(err =>{
        dispatch(returnErrors(err.response.data, err.response.status,'REGESTER_FAIL'));
        dispatch({
            type: REGISTER_FAIL
        })
    })
}

//login user

export const login = ({ email ,password }) => dispatch =>{
    //headers
    const config ={
        headers :{'Content-Type':'application/json'}
    }
    //Request body
    const body = JSON.stringify({ email, password})

    return axios.post('http://localhost:5000/api/auth',body, config)
    .then(res => dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
    }))
    .catch(err =>{
        console.log(err,'error from post Auth')
        dispatch(returnErrors(err.response.data, err.response.status,'LOGIN_FAIL'));
        dispatch({
            type: LOGIN_FAIL
        })
    })
}
//setup logout action creator
export function logout(){
    return{
             type: LOGOUT_SUCCESS
 }
}
//SetUp config/headers and token

export const tokenConfig = getState =>{
        //GET TOKEN FROM LOACALSTORAGE
        const token = getState().auth.token;

        //headers
        const config = {
            header: {
               "content-type": "application/json" 
            }
        }
    
        //if token, add to headers
        if(token) {
            config.header['x-auth-token']= token;
        }

        return config
} 