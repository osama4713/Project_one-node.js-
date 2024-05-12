const jwt = require('jsonwebtoken');
const Admin = require('../../models/registration');

const auth = async (req , res , next) => {
    try{
        const token = req.header('Authorization').replace('Bearer ','');
        const decode = jwt.verify(token , "osama123");
        const admin = await Admin.findOne({_id:decode._id,tokens:token});

        if(!admin){
            throw new Error('Not Found Token');
        }

        req.admin = admin;
        req.token = token;
        next()

    }catch(e){
        res.status(401).send({error:'Please authenticate'});
    }
}

module.exports = auth;