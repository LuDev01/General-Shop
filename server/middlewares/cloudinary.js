const dotenv = require ("dotenv");
const cloudinaryModule = require ("cloudinary").v2;

dotenv.config()

cloudinaryModule.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})

module.exports = cloudinaryModule; 


