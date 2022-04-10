import express from "express";
import { connectDB } from "./src/config/mongoose.js";
import dotenv from "dotenv";
// SET UP CORS
import  itemsRoutes from './src/routes/items.js';
import  loginUserRoutes from './src/routes/userlogin.js';
import  imageRoutes from './src/routes/images.js';

const app = express();

dotenv.config();
//Body parser Middleware
app.use(express.json());


connectDB()

//Use Routes
app.use('/',itemsRoutes);
app.use('/',loginUserRoutes);
app.use('/',imageRoutes);



const port = process.env.PORT || 5000;
app.listen(port,()=>
 console.log(`Server started at port ${port}`))

