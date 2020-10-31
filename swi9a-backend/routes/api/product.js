const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const multer = require('multer');
const shortid = require('shortid')

//item model
const Product = require('../../models/Product');
const User = require('../../models/User');

//product picture storage:

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })
   
var upload = multer({ storage: storage })





// @route    GET api/Product
// @desc     GET All Product
// @access   public

   router.get('/',(req,res) =>{
    Product.find()
            .sort({date : -1}) 
            .then(Product => res.json(Product))  
   })

// @route    GET api/Product
// @desc     Register users
// @access   public

router.post('/',auth,upload.array('productPicture',6),(req,res) =>{
const {name, price, description, category, createdBy} = req.body;
//simple validation
    if(!name || !price || !description){
        return res.status(400).json({msg :'Please enter all fields'});
    }
//simple validation
 Product.findOne({name})
     .then(product => {
     if(product){
             return res.status(400).json({ msg: 'This Product already exists'})
     }
//Product pictures
        let productpictures = [];
        
        if(req.files.length > 0){
            productpictures = req.files.map(file =>{
                return { img: file.filename }
            })
        }

        const newProduct = new Product({
                name,
                price,
                description,
                category,
                productPicture: productpictures,
                createdBy: req.user.id
        });

      newProduct.save().then(product => res.json(product));
   
    // console.log(req.user.id)
    //     res.json(
    //       newProduct
    //     ); 
         }) 
    .catch(err => res.status(404).json({result: 'error accured'}))
   })
    // @route    DELETE api/product/id
    // @desc     DELETE A product
    // @access   public

    router.delete('/:id',auth, (req, res) =>{
        Product.findById(req.params.id) 
        // console.log(req.params)
        .then(Product => Product.remove().then(() => res.json({success:true})))
        .catch(err => res.status(404).json({success:false}))
    })


module.exports = router;