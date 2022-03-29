import express from "express";
import Item from '../models/Item';

 const router = express.Router();


router.get('/',(req,res)=>{
Item.find()
.sort({date:-1})
.then(items => res.json(items));
});


router.delete('/:id', (req,res)=>{
  Item.findById(req.params.id)
   .then(item =>item.remove()
   .then(()=> res.json({Success:true})))
   .catch(err=> res.status(404).json({ Success:false}));
    });
    

  router.post('/',(req,res)=>{
    const newItem = new Item({
        name: req.body.name
    });
    newItem.save().then(item => res.json(item));
     });
    
    //  router.put("/item/:id", (req, res) => {
    //   const id = req.params.parcelId;
      
    //   parcel.updateOne({ _id: id }, {
    //       isCancelled: req.body.isCancelled,
    //     })
    //   .then(() => {
    //    parcel.findOne({_id: id })
    //    .then(result =>res.send(result))
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     res.status(500).json({
    //       error: err,
    //       message:`server error`
    //     });
    //   });
    // });

export{Item, router}
