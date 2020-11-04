const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Productschema  = new Schema({
    name: {
        type: String,
        required: [true, 'Name is field is required'],
        trim:true,
        // maxlength:50
    },
    price: {
        type: Number,
        required: [true, 'Price is field is required'],
    },
    quantity: {
        type: Number,
        required: [true, 'quantity is field is required'],
    },
    description: {
        type: String,
        required: [true, 'Name is field is required'],
        trim:true,
    },
    offer: {
        type: Number
    },
    productPictures:[
        {img:{type: String}}
    ],
    reviews: [
        {
            review: String,
            // trim:true,
            userId: {
                 type: Schema.Types.ObjectId,
                 ref:'user'
                   }    
        }
    ],
    category: {
        type: Schema.Types.ObjectId,
        ref:'category'
    },
    createdBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
     },
    updatedAt: Date

},{ timestamps: true});

module.exports = Product = mongoose.model('product',Productschema);