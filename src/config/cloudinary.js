import cloudinary from 'cloudinary';
const cloudinaryConfig = cloudinary.v2;

cloudinaryConfig.config({
//  cloud_name : process.env.Cloudinary_CloudName,
// api_key : process.env.Cloudinary_APIKey,
// api_secret : process.env.Cloudinary_APISecret,
cloud_name : "dgocgr4g5",
api_key : "163712826529151",
api_secret : "Gwsjspx6oy1ZEClEdft0X222zJo",
})

export default cloudinary;