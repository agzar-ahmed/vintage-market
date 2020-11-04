import axios from 'axios' ;
import {
ADD_TO_CATEGORY,
DELETE_FROM_CATEGORY,
CLEAR_CATEGORY,
CATEGORY_LOADING,
CATEGORY_LOADED,
CATEGORY_ERROR,
GET_ERRORS,
CLEAR_ERRORS
}from './types';

 //RETURN ERRORS
export const returnErrors = (msg, status, id=null) => {
    return {
        type: GET_ERRORS,
        payload: {msg, status, id}
    };
};

export const loadCategory = () => (dispatch, getState) => {
    //category loading
  dispatch({ type: CATEGORY_LOADING });

    return axios.get('http://localhost:5000/api/category')
    
     .then(res =>dispatch({
         type: CATEGORY_LOADED,
         payload: res.data
        }))
     .catch(err => {
        //  dispatch(returnErrors(err.response.data, err.response.status,'CATEGORY_ERROR'));
         dispatch({
             type: CATEGORY_ERROR
         });
     });  
};

export const addToCategory = ({data}) => (dispatch, getState) =>{
    // const config ={
    //     headers :{'application/x-www-form-urlencoded'}
    // }
    // let data = new FormData();
    // data.append('text',name)
    // //Request body
    // const body = {name}
    //  console.log(data,'new category')
            data.forEach((value,key) => {
                console.log(key+value)
                });
                
    console.log(data,'category json')

    const state = getState()

    return axios.post('http://localhost:5000/api/category',data)
    .then(res => dispatch({
        type: ADD_TO_CATEGORY,
        payload: res.data,
        state: state
    }))
   
    .catch(err =>{
        // console.log(err)
         dispatch(returnErrors(err.response.data, err.response.status,'CATEGORY_ERROR'));
        //  dispatch({ type: CATEGORY_ERROR })
    })
}
export function deleteFromCategory(id){
    return{
             type: DELETE_FROM_CATEGORY,
          }
 }
export function clearCategory(){
    return{
             type: CLEAR_CATEGORY       
          }
 }

 //clear errors
export const clearErrors = () => {
    return{
        type: CLEAR_ERRORS
    };
};
 