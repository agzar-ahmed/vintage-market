const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
// const { find } = require('../../models/Cart');
//item model
const Test = require('../../models/test');

router.get('/',(req,res) =>{
    // console.log(req.body.cartItem.quantity)
      Test.find({},function(err, result) {
        if (err) {
          console.log(err);
        } else {
          res.json(result);
        }
    })
})
router.post('/',(req,res) =>{

    // Test.findOneAndUpdate({test : "modify2"},{
    //     "$set":{
    //          test : "modify1",
    //          cartItems: {
    //                quantity: 11
    //             }    
    //     },
    // },{ useFindAndModify: false , new:true}
    //  ,function(err,result){
    //     if(err){
    //       console.log(err)
    //     } else {
    //       res.json(result)
    //     }
    // })
    Test.find({"cartItems.quantity" :11 }
     ,function(err,result){
        if(err){
          console.log(err)
        } else {
          res.json(result)
        }
    })
})
module.exports = router;