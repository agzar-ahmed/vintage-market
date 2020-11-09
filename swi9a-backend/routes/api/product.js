const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const multer = require('multer');
const shortid = require('shortid')

//item model
const Product = require('../../models/Product');
const User = require('../../models/User');
const Category = require('../../models/Category');
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
   //get selected category product
   router.get('/:categoryName',(req,res) =>{
    const {categoryName} = req.params
     console.log(categoryName)
    Category.findOne({name:categoryName})
            // .select('_id')
            .then((category) => {           
                Product.find({category: category._id})
                .sort({date:-1}) 
                .then(products => res.json({
                  products,
                  productsByprice:{
                    //we can do also betwwen two prices
                    under5k: products.filter(product => product.price <= 5000),
                    under4k: products.filter(product => product.price <= 4000),
                    under3k: products.filter(product => product.price <= 3000),
                    under2k: products.filter(product => product.price <= 2000),
                    under1k: products.filter(product => product.price <= 1000),
                    under500: products.filter(product => product.price <= 500),
                    under50: products.filter(product => product.price <= 50)
                  }
                }))              
            })
            .catch(error => res.status(400).json({error}))          
   })
// @route    GET api/Product
// @desc     Register users
// @access   public

router.post('/',upload.array('productPictures',6),(req,res) =>{
const {name, price, quantity, description, category, createdBy} = req.body;
//simple validation
    if(!name || !price || !quantity || !description){
        return res.status(400).json({msg :'Please enter all fields'});
    }
//simple validation
 Product.findOne({name})
     .then(product => {
     if(product){
             return res.status(400).json({ msg: 'This Product already exists'})
     }
     console.log({name, price, quantity, description, category})
//Product pictures
        let productpictures = [];
        
        if(req.files.length > 0){
            productpictures = req.files.map(file =>{
                return { img: file.filename }
            })
        }
        console.log(productpictures)
        const newProduct = new Product({
                name,
                price,
                quantity,
                description,
                category,
                productPictures: productpictures,
                // createdBy: req.user.id
        });
        // console.log(newProduct,"newprod")
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