import express from "express";
const router = express.Router();

import  Joi from "joi";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";

import { UserModel } from "../models/users.js";
import { signupSchema,loginSchema } from "../utilities/validation.js"


// SIGN UP
router.post("/signup", async (req, res) => {
    
    try {
        const result  = await signupSchema.validateAsync(req.body);
        // console.log(result);

      let email = await UserModel.findOne({ email: result.email });
      if (email)
        return res.status(400).json({
          message:`User with email: ${result.email} already exists`
        });
  
      const salt = await bcrypt.genSalt(10);
      const user = await new UserModel({
        name: result.name,
        email: result.email,
        password: await bcrypt.hash(result.password, salt),
      });
  
      const savedUser = await user.save();
      if (!savedUser) throw Error('Something went wrong saving the user');
      // res.status(201).send(user);
  
      //TOken
      const token = jwt.sign(user.toJSON(), "privateKey");
      if (!token) throw Error('Could not sign the token');
      
      res.status(200).json({
        accessToken: token,
        user: user,
        message:`Welcome ${user.name}`
      });
  
  
    } catch (error) {
      res.status(500).json({
          error:error
    })
    }
  });

//   LOGIN
router.post('/login', async (req, res) => {
  try {
    const result  = await loginSchema.validateAsync(req.body);

    const user = await UserModel.findOne({ email: result.email });
    if (!user || !(await bcrypt.compare(result.password, user.password))) {
      return res.status(400).json(`Invalid email or password`);
    }
    
    //Token
    const token = jwt.sign(user.toJSON(), "privateKey");//put private key in a .env
    if (!token) throw Error('Could not sign the token');
    
    res.status(200).json({
      accessToken: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      message:`Welcome ${user.name}`
    });

  } catch (error) {
    res.status(422).json({
        error:error
  })
  }
});


export default router
