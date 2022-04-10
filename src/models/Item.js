import mongoose from "mongoose";

const Schema = mongoose.Schema;

//create Schema
const ItemSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

export const ItemModel = mongoose.model('item',ItemSchema);