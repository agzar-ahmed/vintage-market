// import { StarRate } from "@material-ui/icons";
import { ADD_TO_BASKET } from "../actions/types";
import { DELETE_FROM_BASKET } from "../actions/types";
import { CLEAR_BASKET } from "../actions/types";
import prodImg from './prodImg.jpg';
import soukImg from './soukImg.jpg';

const initialState ={
    checkoutProduct:[
         { 
             product: { 
                 "id":123456,
                 "title":"lorem epsum lorem epsum lorem epsum lorem epsum",
                 "price":7,
                 "rating":4,
                 "image":soukImg,
                 },
                 quantity: 4
         },
         { 
             product: { 
                 "id":"123457",
                 "title":"lorem epsum lorem epsum lorem epsum lorem epsum",
                 "price":1,
                 "rating":4,
                 "image":soukImg,
                 },
                 quantity: 5
         },
         { 
             product: { 
                 "id":123458,
                 "title":"lorem epsum lorem epsum lorem epsum lorem epsum",
                 "price":6,
                 "rating":3,
                 "image":prodImg,
                 },
                 quantity: 2
         }
    ]
 //     availibleProduct:[
 //     { 
 //         product: { 
 //             "id":"123456",
 //             "title":"lorem epsum lorem epsum lorem epsum lorem epsum",
 //             "price":7,
 //             "rating":4,
 //             "image":prodImg,
 //             }
 //     },
 //     { 
 //         product: { 
 //             "id":"123457",
 //             "title":"lorem epsum lorem epsum lorem epsum lorem epsum",
 //             "price":1,
 //             "rating":4,
 //             "image":soukImg,
 //             }
 //     },
 //     { 
 //         product: { 
 //             "id":"123458",
 //             "title":"lorem epsum lorem epsum lorem epsum lorem epsum",
 //             "price":11,
 //             "rating":5,
 //             "image":soukImg,
 //             }
 //     },
 //     { 
 //         product: { 
 //             "id":"123457",
 //             "title":"lorem epsum lorem epsum lorem epsum lorem epsum",
 //             "price":1,
 //             "rating":4,
 //             "image":soukImg,
 //             }
 //     },
 //     { 
 //         product: { 
 //             "id":"123458",
 //             "title":"lorem epsum lorem epsum lorem epsum lorem epsum",
 //             "price":1,
 //             "rating":4,
 //             "image":prodImg,
 //             }
 //     }
 // ]
 }

export default function basketReducer(state=initialState,action){
    // console.log(state,"reducer state")
    switch(action.type){
        case ADD_TO_BASKET: {
            return {
                ...state,
               ckeckoutProduct: 
               [
                 ...state.checkoutProduct,
                    {
                        product: action.productInfo,
                        quantity: action.quantity
                    }
                ]
            //     availibleProduct:[
            //         ...state.availibleProduct,  
            //     ]
            
             };
        }
        case DELETE_FROM_BASKET:
           
            const new_checkoutProduct =state.checkoutProduct.filter(checkoutProduct =>
                {
                    return action.id !== checkoutProduct.product.id
                }
                )
        return{
            ...state,
             checkoutProduct: new_checkoutProduct

            // ...state.checkoutProduct,
            // {
            //     ...state.checkoutProduct,
            //     // product:{
            //     //     product.filter(product => product.id !== action.id)
            //    }

            
        //     //     //product.filter(product => product.id !== action.id)}
        //    ]
        // //    state.checkoutProduct.map(
        // //         (product)=>
        // //         console.log(product)
        // //     //     product.filter(
        // //     // //        product => product.id !== action.id
        // //     //                )
        // //                    ),
        // //    // ])
        
        //  ]
            
        }
        case CLEAR_BASKET:
           
        return{
            ...state,
             checkoutProduct: []
        }
        default:
            return state;
    }
}