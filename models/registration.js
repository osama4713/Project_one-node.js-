const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');

const AdminSchema = mongoose.Schema({
    FName: {
        type: String,
        required: true,
        trim: true
    },
    LName: {
        type: String,
        required: true,
        trim: true
    },
    Username: {
        type: String,
        required: true,
        trim: true
    },
    Password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value) {
            const password = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

            if (!password.test(value)) {
                throw new Error("Password must include uppercase , lowercase , numbers , speacial characters")
            }
        }
    },
    Email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error("Email is invalid")
            }
        }
    },
    Age: {
        type: Number,
        default: 18,
        trim: true,
        validate(val) {
            if (val <= 0) {
                throw new Error("Age Must Be Positive Value")
            }
        }
    },
    City: {
        type: String,
        required: true,
        trim: true
    },
    tokens: [
        {
            type: String,
            required: true,
            trim: true
        }
    ]

})

// UserSchema.virtual('admin', {
//     ref: 'Admin',
//     localField: "_id",
//     foreignField: "owner"
// })

// *************************************************************
// hashPassword

AdminSchema.pre("save" , async function (){
    if(this.isModified('Password')){
        this.Password = await bcryptjs.hash(this.Password , 8)
    }
})

// *************************************************************
// token

AdminSchema.methods.generateToken = async function () {
    const admin = this ;
    const token = jwt.sign({ _id: admin._id.toString() }, "osama123")
    admin.tokens = admin.tokens.concat(token)    
    await admin.save();
    return token;
}

// *************************************************************
// login

AdminSchema.statics.findByCredentials = async (username , email , pass) => {
    const admin = this ;
    const admin_username = await Admin.findOne({Username:username});
    const admin_email = await Admin.findOne({Email:email});

    if(!admin_username && !admin_email){
        throw new Error("Unable To Login");
    }

    const Check_Password = await bcryptjs.compare(pass , admin.Password);

    if(!Check_Password){
        throw new Error("Unable To Login");
    }
}


// *************************************************************
// hide private data

AdminSchema.methods.toJSON = function () {
    const admin = this
    
    const adminObject = admin.toObject();

    delete adminObject.Password;
    delete adminObject.tokens;

    return adminObject;
} 

// *************************************************************

const Admin = mongoose.model('Admin' , AdminSchema);

module.exports = Admin ; 