import express from 'express';
import  {generateToken} from '../utils.js';
import expressAsyncHandler from "express-async-handler";
import User from '../models/userSchema.js';
import bcrypt from 'bcryptjs';

 const userRouter=express.Router();

userRouter.post('/signin',expressAsyncHandler(async (req,res)=>{
    const user= await User.findOne({email:req.body.email});
    if(user){
        if(bcrypt.compareSync(req.body.password,user.password)){
            res.send({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin,
                token:generateToken(user.toObject()),
            });
            return;
        }
        res.status(401).send({message:"Password doesn't match !"});
    }
    res.status(401).send({message:"Invalid Email or password"});

}));
userRouter.post('/signup',expressAsyncHandler(async(req,res)=>{
    const newUser=new User({
        name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password),
    });
    const user= await newUser.save();
    console.log(user)
    res.send({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:generateToken(user.toObject()),
    })

}));

 export default userRouter;