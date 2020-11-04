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
       // console.log(category,'category')
       // console.log(parentId,'parentId')
        if(parentId==undefined){
            //console.log(parentId,'parentId2')
           let catlist= [
               ...categories,
               {
                name: category.name,
                catId: category._id,
                // parentId: category.parentId,
                childCategory: []
            }
            ]
         console.log(catlist,'cat. list')
            return catlist
        }


        for(let cat of categories){
            // console.log(cat.catId,'cat id')
  
            if(cat.catId == parentId){
                // console.log(parentId,'parent id')
                myCategories.push({
                    ...cat,
                    childCategory: cat.childCategory  
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
                    childCategory: cat.childCategory 
                    ? buildNewCategories(parentId,[...cat.childCategory],category)
                    :[]
                })
            }                                                                                                                                                                                                                                                                   
        }
       // console.log(myCategories)
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
                    category:action.payload,
                    CategoryisLoading: false
                };
            case ADD_TO_CATEGORY:
                const category = action.payload
                // const state = action.state
                // console.log(category.parentId,'parent id')
                // console.log(action.state.categories.category,'state categories ')
                // console.log(action.payload,'payload')

                 const updatedCategories = buildNewCategories(category.parentId,action.state.categories.category,action.payload)
                // console.log(updatedCategories,'cat reduce updated Categories ')
                
                return {
                    ...state,
                    category: updatedCategories
                };   
            case DELETE_FROM_CATEGORY :
                return {
                    ...state,
                }; 
            default:
                return state;
    
        }
    }
    