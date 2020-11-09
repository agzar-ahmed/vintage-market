import axios from 'axios' ;
import {
    INITIALDATA_LOADING,
    INITIALDATA_LOADED,
    INITIALDATA_ERROR,
    GET_ERRORS
}from './types';

 //RETURN ERRORS
 export const returnErrors = (msg, status, id=null) => {
    return {
        type: GET_ERRORS,
        payload: {msg, status, id}
    };
};

export const getInitialData = ( ) => (dispatch, getState)=>{
  
    dispatch({type: INITIALDATA_LOADING})
    return axios.get('http://localhost:5000/api/initialdata')
   
     .then(res => 
        dispatch({
        type: INITIALDATA_LOADED,
        payload: res.data,
        // state: state    
    })
    //console.log(res.data,'initial data')
    )
   
    .catch(err =>{
        console.log(err)
        // dispatch(returnErrors(err.response.data, err.response.status,' INITIALDATA_ERROR'));
        // //  dispatch({ type: PRODUCT_ERROR })
    })
    

 }
