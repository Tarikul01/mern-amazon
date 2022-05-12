import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
const app=express();


dotenv.config();
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("connection success")
}).catch((err)=>console.log(err.message));

app.get('/api/products',(req,res)=>{
    res.send(data.products)

})
app.get('/api/products/slug/:slug',(req,res)=>{
     const product=data.products.find(x=>x.slug===req.params.slug);

     if(product){
         res.send(product);
     }else{
         res.status(404).send({message: "Product Not backend"})
     }
    // res.send(req.params.slug)

})


app.get('/api/products/:id',(req,res)=>{
    const product=data.products.find(x=>x._id===req.params.id);

    if(product){
        res.send(product);
    }else{
        res.status(404).send({message: "Product Not backend"})
    }
   // res.send(req.params.slug)

})
const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server at http://localhost:${port}`);
})