const Admin = require('../../models/registration');
const express = require('express');

const router = express.Router();


// ****************************************************** 

router.get('/admins' , async (req , res) =>{
    try{
        const admins = await Admin.find({}) ;
        res.status(200).send(admins)
    }
    catch(e){
        res.status(500).send(e.message)
    }
});

router.get('/admin/:id' , async (req , res) => {
    try{
        const id = req.params.id;
        const admin = await Admin.findOne({_id:id});
        if(!admin){
            throw new Error ('This Admin is Not Found');
        }
        res.status(200).send(admin);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

// ****************************************************** 

router.patch('/admin/:id' , async (req , res) => {
    try{
        const id = req.params.id;
        const admin = await Admin.findOneAndUpdate({_id:id} , req.body , {
            new : true , 
            runValidators : true
        });
        const token = await admin.generateToken()

        if(!admin){
            throw new Error ('This Admin is Not Found');
        }
        res.status(200).send({admin , token});
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

// ****************************************************** 

router.delete('/admins' , async (req , res) => {
    try{
        const admin = await Admin.deleteMany({});
        res.status(200).send(admin);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

router.delete('/admin/:id' , async (req , res) => {
    try{
        const id = req.params.id;
        const admin = await Admin.findOneAndDelete({_id:id});

        if(!admin){
            throw new Error ('This Admin is Not Found');
        }

        res.status(200).send(admin);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

// ****************************************************** 

module.exports = router ;