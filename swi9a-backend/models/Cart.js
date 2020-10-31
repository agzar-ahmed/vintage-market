const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Cartschema  = new Schema({
    user: { type:mongoose.Schema.Types.ObjectId},
    test: {
        type:String,
        required:false
        },
    cartItems:[
        {
            product: {
                type:mongoose.Schema.Types.ObjectId,
                ref:'product'
                },
            quantity: {
                type:Number,
                default:1
                },
            price: {
                type:Number,
                required:true
                },
        
        }
    ]

},{ timestamps: true});

module.exports = Cart = mongoose.model('cart',Cartschema);