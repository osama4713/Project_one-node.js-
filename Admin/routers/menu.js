const Menu = require('../../models/menu');
const auth = require('../middleware/auth')
const express = require('express');

const router = express.Router();

router.post('/menu' ,auth, async (req , res) =>{
    try{
        const menu = new Menu(req.body);
        await menu.save();
        res.status(200).send(menu)
    }
    catch(e){
        res.status(500).send(e.message)
    }
});

// ****************************************************** 

router.get('/menu' ,auth, async (req , res) =>{
    try{
        const menu = await Menu.find({});
        res.status(200).send(menu)
    }
    catch(e){
        res.status(500).send(e.message)
    }
});

// ****************************************************** 

router.get('/order/:id' ,auth, async (req , res) => {
    try{
        const id = req.params.id;
        const order = await Menu.findOne({_id:id});
        if(!order){
            throw new Error ('This Order is Not Available in Menu');
        }
        res.status(200).send(order);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

// ****************************************************** 

router.patch('/order/:id' ,auth, async (req , res) => {
    try{
        const id = req.params.id;
        const order = await Menu.findOneAndUpdate({_id:id} , req.body , {
            new : true , 
            runValidators : true
        });

        if(!order){
            throw new Error ('This Order is Not Available in Menu');
        }
        res.status(200).send(order);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

// ****************************************************** 

router.delete('/menu' ,auth, async (req , res) => {
    try{
        const order = await Menu.deleteMany({});
        res.status(200).send(order);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

// ****************************************************** 

router.delete('/order/:id' ,auth, async (req , res) => {
    try{
        const id = req.params.id;
        const order = await Menu.findOneAndDelete({_id:id});

        if(!order){
            throw new Error ('This Order is Not Available in Menu');
        }

        res.status(200).send(order);
    }
    catch(e){
        res.status(500).send(e.message);
    }
});

// ****************************************************** 

module.exports = router ;