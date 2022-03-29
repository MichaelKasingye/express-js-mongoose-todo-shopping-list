import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import  itemsRoutes from './routes/items.js';
const app = express();

dotenv.config();
//Body parser Middleware
app.use(express.json());

//process.env.process
let mongoString = process.env.MONGOD_MLAB;

//mongoose connect
mongoose
.connect(mongoString,{ useUnifiedTopology: true , useNewUrlParser: true})
.then(()=> console.log('👌 Connected to Mongodb.....Michael..'))
.catch(err => console.log('🚨 failed Server to connect..'+(err)));
 
//Use Routes
app.use('/',itemsRoutes);

const port = process.env.PORT || 5000;
app.listen(port,()=>
 console.log(`Server started at port ${port}`))

