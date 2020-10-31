import {
CATEGORY_LOADING,
CATEGORY_LOADED,
ADD_TO_CATEGORY,
DELETE_FROM_CATEGORY,
CLEAR_CATEGORY ,
CATEGORY_ERROR
      }from "../actions/types";
    
    const initialState = {
        token: localStorage.getItem('token'),
        CategoryisLoading: false,
    };

    const buildNewCategories = (parentId,categories, category) => {
        let myCategories = [];
        // categories = [
        //         {
        //             name: "Electronics",
        //             catId: "5f7b47444da5b61f28a07fa9",
        //             childCategory: [
        //                 {
        //                     name: "Mobiles",
        //                     catId: "5f92bb22df11761f9424b8d4",   
        //                     parentId: "5f7b47444da5b61f28a07fa9",
        //                     childCategory: [
        //                         {
        //                             name: "Xiaomi",
        //                             catId: "5f9aaca2563be42c340c70ef",
        //                             parentId: "5f92bb22df11761f9424b8d4",
        //                             childCategory: [
        //                                 {
        //                                     name: "Air dot",
        //                                     catId: "5f9ac0a415165b233c28b93d",
        //                                     parentId: "5f9aaca2563be42c340c70ef",
        //                                     childCategory: []
        //                                 },
        //                                 {
        //                                     name: "readme pro",
        //                                     catId: "5f9ac15215165b233c28b93e",
        //                                     parentId: "5f9aaca2563be42c340c70ef",
        //                                     childCategory: []
        //                                 }                     
        //                                         ]
        //                         }
        //                                 ]
        //                                 }
        //                             ]
        //         }
        //     ]

        for(let cat of categories){
            // console.log(cat.catId,'cat id')
  
            if(cat.catId == parentId){
                // console.log(parentId,'parent id')
                myCategories.push({
                    ...cat,
                    childCategory: cat.childCategory && cat.childCategory.length > 0 
                    ? buildNewCategories(parentId,[...cat.childCategory,{
                        name: category.name,
                        catId: category._id,
                        parentId: category.parentId,
                        childCategory: category.childCategory
                    }],category)
                    :[]
                })
                
            }else{
                myCategories.push({
                    ...cat,
                    childCategory: cat.childCategory && cat.childCategory.length > 0 
                    ? buildNewCategories(parentId,[...cat.childCategory],category)
                    :[]
                })
            }                                                                                                                                                                                                                                                                   
        }
        console.log(myCategories)
        return myCategories
    }
    
    export default function(state = initialState, action){
        switch (action.type) {
            case CATEGORY_LOADING:
               return {
                   ...state,
                   CategoryisLoading: true
               };
            case CATEGORY_LOADED:
                return {
                    ...state,
                    category: action.payload,
                    CategoryisLoading: false
                };
            case ADD_TO_CATEGORY:
                const category = action.payload
                // const state = action.state
                console.log(category.parentId,'parent id')
                console.log(action.state.categories.category,'state categories ')
                console.log(action.payload,'payload')

                 const updatedCategories = buildNewCategories(category.parentId,action.state.categories.category,action.payload)
                console.log(updatedCategories,'cat reduce updated Categories ')
                
                return {
                    ...state,
                    category:updatedCategories
                };   
            case DELETE_FROM_CATEGORY :
                return {
                    ...state,
                }; 
            default:
                return state;
    
        }
    }
    