import express from "express";
const router = express.Router();
import {ItemModel} from '../models/Item.js';
import auth from '../middleware/auth.js';



router.get('/', auth,(req,res)=>{
  ItemModel.find()
.sort({date:-1})
.then(items => res.json(items));
});


router.delete('/:id', auth,(req,res)=>{
  ItemModel.findById(req.params.id)
   .then(item =>item.remove()
   .then(()=> res.json({Success:true})))
   .catch(err=> res.status(404).json({ Success:false}));
    });
    

  router.post('/', auth,(req,res)=>{
    const newItem = new ItemModel({
        name: req.body.name,
        description:req.body.description,
    });
    newItem
    .save()
    .then(item => res.json(item))
   .catch(err=> res.status(404).json({ Success:false}));
     });
    
    //  PATH PARM
    router.post('/name/:name/description/:description', auth,(req,res)=>{
      const newItem = new ItemModel({
          name: req.params.name,
          description:req.params.description,
      });
      newItem
      .save()
      .then(item => res.json(item))
     .catch(err=> res.status(404).json({ Success:false}));
       });

  //  QUERY PARM
  router.post('/item', auth,(req,res)=>{
    const newItem = new ItemModel({
        name: req.query.name,
        description:req.query.description,
    });
    newItem
    .save()
    .then(item => res.json(item))
   .catch(err=> res.status(404).json({ Success:false}));
     });

     router.put("/:id", auth,(req, res) => {
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
