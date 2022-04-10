import mongoose from "mongoose";

const Schema = mongoose.Schema;

//create Schema
const ImageSchema = new Schema({
    displayName: {
        type: String,
      },
      image: {
        type: String,
      },
      cloudinary_id: {
          type: String,
        },
});

export const imageModel = mongoose.model('image',ImageSchema);