import express from "express";
const router = express.Router();

import cloudinary  from "../config/cloudinary.js";
import upload  from"../config/multer.js";
import {imageModel} from"../models/image.js";


router.get("/image", async (req, res) => {
    try{
        const result = await imageModel.find()

  res.json(result)
    }catch(err){
        console.log(err)
    }

  }); 

router.post("/image",upload.single("image"),async (req, res) => {
    try{
        const result = await cloudinary.uploader.upload(req.file.path)
// res.json(result)
const image = new imageModel(
    {    
        displayName: req.body.displayName,
        image: result.secure_url,
        cloudinary_id: result.public_id,
  });
  image.save()
  res.json(image)
    }catch(err){
        console.log(err)
        res.json({Erorr:err})
    }

  });

  router.put("/image/:id",upload.single("image"), async (req, res) => {
      try{
        const id = req.params.id;
        let image = await imageModel.findById(id)
        await cloudinary.uploader.destroy(image.cloudinary_id)

        const result = await cloudinary.uploader.upload(req.file.path)
// res.json(result)

        const data =     {    
            displayName: req.body.displayName || image.displayName ,
            image:  result.secure_url || image.image,
            cloudinary_id: result.public_id || image.cloudinary_id,
      }
      image =  await imageModel.findByIdAndUpdate(id, data, {new: true})

//   image.save()
  res.json(image)
    }catch(err){
        console.log(err)
    }
  });

  router.delete("/image/:id", async (req, res) => {

    try {
        const id = req.params.id;
        let image = await imageModel.findById(id)
        await cloudinary.uploader.destroy(image.cloudinary_id)
        await image.remove()
        res.json({
                 Success: true,
                 message:`information deleted`,
                 image:image
                 })
    } catch (error) {
        res.status(404)
        .json({ Success: false,
                error:error      
        })
    }
  });

  export default router;