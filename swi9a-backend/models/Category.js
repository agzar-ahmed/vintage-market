const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Categoryschema  = new Schema({
    name: {
        type: String,
        required: [true, 'Name is field is required'],
        trim:true,
        maxlength:50
    },
    categoryImage: {
        type: String
    },
    parentId: {
        type: String
    }
},{ timestamps: true});

module.exports = Category = mongoose.model('category',Categoryschema);