
const Admin = require('../../models/registration');
const auth = require('../middleware/auth')
const express = require('express');

const router = express.Router();

// ****************************************************** 

router.post('/registration' , async (req , res) =>{
    try{
        const admin = new Admin(req.body);
        const token = await admin.generateToken()
        await admin.save();
        res.status(200).send({admin , token})
    }
    catch(e){
        res.status(500).send(e.message)
    }
});

// ****************************************************** 
// login

router.post('/login' , async (req , res) => {
    try{
        const admin = await Admin.findByCredentials(req.body.Username , req.body.Email , req.body.Password);
        const token = await admin.generateToken();
        res.status(200).send({admin , token})
    }
    catch(e){
        res.status(500).send(e.message)
    }
})

// ****************************************************** 

router.patch('/admin/:id' ,auth, async (req , res) => {
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
//profile

router.get('/profile' ,auth, async (req , res) => {
    res.status(200).send(req.admin)
})

// ****************************************************** 
// logout

router.delete('/logout' ,auth, async (req , res) => {
    try{
        req.admin.tokens = req.admin.tokens.filter((ele) =>{
            return ele !== req.token
        })
        await res.admin.save()
        res.send()

    }catch(e){
        res.status(500).send(e.message)
    }

})

// ****************************************************** 
// logOutAll

router.delete('/logoutAll',auth, async (req , res) => {
    try{
        req.admin.tokens =[]
        await req.admin.save()
        res.send()

    }catch(e){
        res.status(500).send(e.message)
    }
})

// ****************************************************** 


module.exports = router ;