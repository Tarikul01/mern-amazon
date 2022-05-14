import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';
const app=express();


//Config dotenv file
dotenv.config();

// Connect mongodb database 
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=> console.log('Database connection success!'))
.catch((err)=> console.log(err));
   
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// Use all route 

app.use('/api/seed',seedRouter);

app.use('/api/products',productRouter);
app.use('/api/users',userRouter)
app.use('/api/orders',orderRouter);

// Handle error for express async handler 
app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message});
})

const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server at http://localhost:${port}`);
})