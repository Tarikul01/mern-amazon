import express from 'express';
import Product from '../models/productSchema.js';
import User from '../models/userSchema.js';
import data from '../data.js';
const seedRouter=express.Router();
seedRouter.get('/',async (req,res)=>{
    await Product.deleteMany({});
    const createdProduct=await Product.insertMany(data.products);

    
    await User.deleteMany({});
    const createdUsers=await User.insertMany(data.users);
    res.send({createdProduct,createdUsers});
})
export default seedRouter;