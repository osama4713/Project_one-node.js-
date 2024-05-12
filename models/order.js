const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    description : {
        type : String,
        required : true,
        trim : true
    },
    numbr_order : {
        type : Number,
        default : 1,
        trim : true
    },
    price : {
        type : Number,
        required : true,
        trim : true
    },
    category : {
        type : String,
        required : true,
        trim : true
    },
    total:{
        type : Number,
        trim : true
    }
})

const Order = mongoose.model('Order' , OrderSchema);

module.exports = Order ;