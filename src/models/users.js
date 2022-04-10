import mongoose from "mongoose";

const Schema = mongoose.Schema;

//create Schema
const ItemSchema = new Schema({
    name: {
        type: String,
        // unique: true,
        required: true,
      },
      email: {
        type: String,
        // unique: true,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
});

export const UserModel = mongoose.model('itemsUser',ItemSchema);