// import { v2 as cloudinary } from 'cloudinary';
// import fs from "fs"
// const uploadOnCloudinary = async(filePath)=>{
//   cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET
// });
//     try{
//        const uploadResult = await cloudinary.uploader
//        .upload(filePath)
//        fs.unlinkSync(filePath)
//        return uploadResult.secure_url
//     }catch(error){
//       fs.unlinkSync(filePath)
//       return res.status(500).json({message:"cloudinary error"})
//     }
// }

// export default uploadOnCloudinary


import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePath) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      folder: "assistant_images", // optional: put all images in this folder
    });
    fs.unlinkSync(filePath); // delete local file after upload
    return uploadResult.secure_url; // ✅ return URL
  } catch (error) {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    throw new Error("Cloudinary upload failed");
  }
};

export default uploadOnCloudinary;




