const mongoose = require('mongoose');

const MenuSchema = mongoose.Schema({
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
})

// *************************************************************
// hide private data

MenuSchema.methods.toJSON = function () {
    const menu = this
    
    const menuObject = menu.toObject();

    delete menuObject.numbr_order;

    return menuObject;
} 

// *************************************************************

const Menu = mongoose.model('Menu' , MenuSchema);

module.exports = Menu ;