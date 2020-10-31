const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth')
const multer = require('multer');
const shortid = require('shortid')

//item model
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

const createCategories =(categories, parentId = null) =>{
    const categoryList=[];
    let category ;
    if(parentId == null){
         category = categories.filter(cat => cat.parentId == undefined)      
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


// @route    GET api/category
// @desc     GET All category
// @access   public

  router.get('/',(req,res) =>{
  Category.find()
            .sort({date : -1}) 
            .then(Category => {
              categoryList = createCategories(Category)
              res.json(categoryList)
            }
              
              )  
   })

// @route    POST api/category
// @desc     Post category
// @access   public

  router.post('/',upload.array('categoryImage',1),(req,res) =>{
  const name = req.body.text;
  // console.log(req.body,'req body')
  // console.log(req.files['categoryImage'],'request files')
  // console.log(req.files[0],'file')                     

    //simple validation
      if(!name){
          return res.status(400).json({msg :'Please enter the field'});
      }

      Category.findOne({name})
      .then(category => {
      if(category){
              return res.status(400).json({ msg: 'This category already exists'})
          }
      //category pictures
      let categoryUrl
      const categoryObj = {
                            name,
                            }
      // console.log(categoryObj,'cat Obj')
        if(req.files){
          categoryUrl = 'http://localhost:5000/public/'+ req.files[0].filename   
          categoryObj.categoryImage = categoryUrl
        } 
        // console.log(categoryUrl,'cat url')
        // console.log(req.files[0],'file')                     
        if(req.body.parentId){
              categoryObj.parentId = req.body.parentId
        }
              const newCategory = new Category(categoryObj);
              console.log(newCategory,'new cat')
      newCategory.save().then(category => res.json(category));
      })
      .catch(err => res.status(404).json({success:false}))       
   })
    // @route    DELETE api/question/id
    // @desc     DELETE A question
    // @access   public

    router.delete('/:id',auth, (req, res) =>{
        Category.findById(req.params.id) 
        // console.log(req.params)
        .then(category => category.remove().then(() => res.json({success:true})))
        .catch(err => res.status(404).json({success:false}))
    })


module.exports = router;