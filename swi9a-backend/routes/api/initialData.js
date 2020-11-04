const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')

//item model
const Product = require('../../models/Product');
const Category = require('../../models/Category')

// @route    GET api/Product
// @desc     GET All Product
// @access   private

router.get('/',(req,res)=>{

    const categories = Category.find({})
    const products = Product.find({})
                    .select('_id name category')
                    .populate('category')

    Promise.all([categories,products])
    .then((result)=> res.status(200).json({
       categories:result[0],
       products:result[1]
    }))
    .catch(err => {
        // render some error page here
        res.sendStatus(500);
    })    
})

module.exports = router;