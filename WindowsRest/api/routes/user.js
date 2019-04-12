const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcrypt");

// router.post("/signup",(req,res,next)=>{
//     bcrypt.hash( req.body.password,10,(err,hash)=>{
//         if(err){
//             return res.status(404).json({err : "messgae error"+err.message });
//         }else{
//         const user = new User({
//             _id : mongoose.Types.ObjectId(),
//             name : req.body.name,
//             email : req.body.email,
//             password: hash    
//         });
//         user.save().then((result)=>{ console.log(result); }).catch((err)=>{ res.status(404).json({
//                error : `message is ${err.message}`
//            })});    
//         }   
    
//     )
    
// };

router.post("/signup",(req,res,next)=>{
       bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){ return res.status(404).json({err : "messgae error"+err.message }); }

        else{
            const user = new User({
                 _id  : mongoose.Types.ObjectId(),
                email : req.body.email,
             password : hash    
                });

                user.save().then((result)=>{console.log(`${result}`)}).catch((err)=>{res.status(404).json({
                    err: "if you are seeing this you are getting error"
                })});
        }

       })
});

router.get("/details",(req,res,next)=>{
    //const user = new User();
    User.find().exec().then((result)=>{res.status(202).json(result);})
    .catch((err)=>{res.status(404).json({err : `${err.message}`})});
});

router.post("/signin",(req,res,next)=>{
const pwd = req.body.password;
const hash = req.body.hash;
bcrypt.compare(pwd,hash,(err,result)=>{
    if(result){
        res.status(202).json({user : "Authenticated!!!"});
    }

    res.status(202).json({err :`user not authenticated ${err.message}`});
});
});

module.exports = router; 
