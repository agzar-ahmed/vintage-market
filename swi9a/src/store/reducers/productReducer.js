import {
    ADD_PRODUCT,
    DELETE_FROM_PRODUCT,
    CLEAR_PRODUCT,
    PRODUCT_ERROR,
    PRODUCT_LOADING,
    PRODUCT_LOADED
       //PRODUCT_ERROR
            } from "../actions/types";
          
        
        const initialState = {
            token: localStorage.getItem('token'),
            productisLoading: false,
        };
    
        
        export default function(state = initialState, action){
            switch (action.type) {
                case  PRODUCT_LOADING:
                   return {
                       ...state,
                       productisLoading: true
                   };
                case PRODUCT_LOADED:
                    return {
                        ...state,
                        product: action.payload,
                        productisLoading: false
                    };
                case ADD_PRODUCT:                    
                    return {
                        ...state,
                        product:[
                               ...product,
                               action.payload
                        ]
                    };   
                case DELETE_FROM_CATEGORY :
                    return {
                        ...state,
                    }; 
                default:
                    return state;
        
            }
        }
        