const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Testschema  = new Schema({
    test:{
        type:String
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

module.exports = Test = mongoose.model('test',Testschema);