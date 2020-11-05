const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

//item model
const Product = require('../../models/Product');
const Category = require('../../models/Category')


// create a category: show categories in organize way
const createCategories =(categories, parentId = null) =>{
  
    const categoryList=[];
    let category ;
    if(parentId == null){
         category = categories.filter(cat => cat.parentId == undefined ||  cat.parentId == "undefined" ||  cat.parentId == "null") 
        //  console.log(categories)     
    }else{
         category = categories.filter(cat => cat.parentId == parentId) 
    }
    //  console.log(category)
    for(let cat of category ){
      categoryList.push({
                    name: cat.name,
                    // image: category.img,
                    catId: cat._id,
                    parentId: cat.parentId,
                    childCategory: createCategories(categories,cat._id)
      })
    }
    return categoryList
};

// @route    GET api/Product
// @desc     GET All Product
// @access   private

router.get('/',(req,res)=>{

    const categories = Category.find({})
    const products = Product.find({})
                    .select('_id name category price description quantity productPictures')
                    .populate('category')

    Promise.all([categories,products])
    .then((result)=> res.status(200).json({
       categories:createCategories(result[0]),
       products:result[1]
    }))
    .catch(err => {
        // render some error page here
        res.sendStatus(500);
    })    
})

module.exports = router;