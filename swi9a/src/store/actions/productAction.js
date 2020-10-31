import axios from 'axios' ;
import {
ADD_TO_PRODUCT,
DELETE_FROM_PRODUCT,
CLEAR_PRODUCT
}from './types';


export function addToProduct(productInfo,quantity){
    return{
             type: ADD_TO_PRODUCT,
         }
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
