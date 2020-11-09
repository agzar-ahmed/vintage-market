import {
    INITIALDATA_LOADING,
    INITIALDATA_LOADED,
    INITIALDATA_ERROR,
      }from "../actions/types";
    
    const initialState = {
        inialDataisLoading: false,
        initialData:{
            categories:null,
            products:null
        }
    };

   
export default function(state = initialState, action){
        switch (action.type) {
            case INITIALDATA_LOADING:
               return {
                   ...state,
                   inialDataisLoading: true
               };
            case INITIALDATA_LOADED:
                return {
                    ...state,
                    initialData: action.payload,
                    inialDataisLoading: false
                };
          
            default:
                return state;
    
        }
}
    