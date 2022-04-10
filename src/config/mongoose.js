import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = ()=>{
    //process.env.process
let mongoString = process.env.MONGOD_MLAB;

//mongoose connect
mongoose
.connect(mongoString,{ useUnifiedTopology: true , useNewUrlParser: true})
.then(()=> console.log('👌 Connected to Mongodb.......'))
.catch(err => console.log('🚨 failed Server to connect..'+(err)));
}

export {connectDB}