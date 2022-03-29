import express from "express";
import {ItemModel} from '../models/Item.js';

 const router = express.Router();


router.get('/',(req,res)=>{
  ItemModel.find()
.sort({date:-1})
.then(items => res.json(items));
});


router.delete('/:id', (req,res)=>{
  ItemModel.findById(req.params.id)
   .then(item =>item.remove()
   .then(()=> res.json({Success:true})))
   .catch(err=> res.status(404).json({ Success:false}));
    });
    

  router.post('/',(req,res)=>{
    const newItem = new ItemModel({
        name: req.body.name
    });
    newItem
    .save()
    .then(item => res.json(item))
   .catch(err=> res.status(404).json({ Success:false}));

     });
    
     router.put("/:id", (req, res) => {
      const id = req.params.id;
      ItemModel.findOne({_id: id })
       .then(itemId =>{
         if (!itemId) {
        return res.status(404).json(`no such id ${id}`);
      }})

      ItemModel.updateOne({ _id: id }, {
        name: req.body.name,
        })
        .then((itemId) => {
          if (!itemId) {
            return res.status(404).json(`no such id ${id}`);
          }
        })
      .then(() => {
       ItemModel.findOne({_id: id })
       .then(result =>{res.status(200).json(result)})
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err,
          message:`Id is wrong`
        });
      });
    });

export default router
