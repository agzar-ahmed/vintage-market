const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
//item model
const Cart = require('../../models/Cart');

// @route    GET api/cart
// @desc     GET All cart
// @access   public

   router.get('/',(req,res) =>{
    Cart.find()
            .sort({date : -1}) 
            .then(Cart => res.json(Cart))  
   })

// @route    GET api/cart
// @desc     Register users
// @access   public

router.post('/',auth,(req,res) =>{
    //const {name} = req.body;
      //simple validation
    // if(!name){
    //     return res.status(400).json({msg :'Please enter the field'});
    // }
  //simple validation
    Cart.findOne({ user: req.user.id })
    .then(cart => {
     if(cart){
                const item = cart.cartItems.find(cartItem => cartItem.product == req.body.cartItem.product);     
                console.log(req.body.cartItem, "entred product");
                //update the number of items
                let condition,update;
                if(item){
                    condition = {"user":req.user.id, "cartItems.product": req.body.cartItem.product };
                    update = {
                        "$set":{
                            //  test : "test"
                              "cartItems.$": {
                                    ...req.body.cartItem,
                                    quantity: req.body.cartItem.quantity + item.quantity
                                }    
                        }
                    }
                
                }else{
                    condition ={"user": req.user.id};
                    update = { "$push":{cartItems : req.body.cartItem}};
                }
                Cart.findOneAndUpdate(condition,update,{useFindAndModify: false ,new:true},
                    function(err,result){
                        if(err){
                            console.log(err)
                        }else{
                            res.json(result)
                        }
                    }
                    )
     } else{
          
        const newCart = new Cart({
            user: req.user.id,
            cartItems: [req.body.cartItem]
            });
            newCart.save().then(cart => res.json(cart));
     }
    // }
    // .catch(err => res.status(404).json({success:false}))       
   })
   })
    // @route    DELETE api/question/id
    // @desc     DELETE A question
    // @access   public

    // router.delete('/:id',auth, (req, res) =>{
    //     Cart.findById(req.params.id) 
    //     // console.log(req.params)
    //     .then(cart => cat.remove().then(() => res.json({success:true})))
    //     .catch(err => res.status(404).json({success:false}))
    // })
    

module.exports = router;