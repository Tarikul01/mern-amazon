import express from 'express';
import data from './data.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
const app=express();


//Config dotenv file
dotenv.config();

// Connect mongodb database 
mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=> console.log('Database connection success!'))
.catch((err)=> console.log(err));
   


// Use all route 

app.use('/api/seed',seedRouter);

app.use('/api/products',productRouter);

const port=process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server at http://localhost:${port}`);
})