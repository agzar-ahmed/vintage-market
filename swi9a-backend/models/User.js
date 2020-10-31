const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Userschema  = new Schema({
    name: {
        type: String,
        required: [true, 'Name is field is required']
    },
    email: {
        type: String,
        required: [true, 'Name is field is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Name is field is required']
    },
    register_date: {
        type: Date,
        default: Date.now
    }
});


module.exports = User = mongoose.model('user',Userschema);