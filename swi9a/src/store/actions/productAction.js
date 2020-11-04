import axios from 'axios' ;
import {
ADD_PRODUCT,
DELETE_FROM_PRODUCT,
CLEAR_PRODUCT,
PRODUCT_ERROR,
GET_ERRORS
}from './types';

 //RETURN ERRORS
 export const returnErrors = (msg, status, id=null) => {
    return {
        type: GET_ERRORS,
        payload: {msg, status, id}
    };
};

export const addProduct= ({data}) => (dispatch, getState)=>{
   
    console.log(data,'new product')
    // data.forEach((value,key) => {
    //             console.log(key+value)
    //             });
                
    //console.log(newProduct,'category json')

    // const state = getState()

    return axios.post('http://localhost:5000/api/product',data)
    .then(res => dispatch({
        type: ADD_PRODUCT,
        payload: res.data,
        // state: state
    }))
   
    .catch(err =>{
       console.log(err)
        dispatch(returnErrors(err.response.data, err.response.status,'PRODUCT_ERROR'));
        // //  dispatch({ type: PRODUCT_ERROR })
    })

 }
export function deleteFromProduct(id){
    return{
             type: DELETE_FROM_PRODUCT,
               
         }
 }
export function clearProduct(){
    return{
             type: CLEAR_PRODUCT       
         }
 }
