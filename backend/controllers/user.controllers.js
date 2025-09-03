// import User from "../models/user.model.js"
// export const getCurrentUser=async(req,res)=>{
//   try{
//       const userId=req.userId
//       const user = await User.findById(userId).select("-password")
//       if(user){
//         return res.status(400).json({message:"user not found"})
//       }
//       return res.status(200).json(user)
//   }catch(error){
//        return res.status(400).json({message:"get current user error"})
//   }
// }

// export const updateAssistant=async (req,res)=>{
//   try{
//       const {assistantName,imageurl}=req.body
//       let assistantImage;

//       if(req.file){
//         assistantImage=await uploadOnCloudinary(req.file.path)
//       }else{
//         assistantImage=imageurl
//       }
//       const user=await User.findByIdAndUpdate(req.userId,{assistantImage,assistantName},{new:true}).select("-password")
//       return req.status(200).json(user)
//   }catch(error){

//     return res.status(400).json({message:"updateAssistantError user error"})
//   }
// }






// import User from "../models/user.model.js";
// // import { uploadOnCloudinary } from "../utils/cloudinary.js"; // if you use cloudinary

// export const getCurrentUser = async (req, res) => {
//   try {
//     const userId = req.userId;
//     const user = await User.findById(userId).select("-password");

//     if (!user) {
//       return res.status(404).json({ message: "user not found" });
//     }

//     return res.status(200).json(user);
//   } catch (error) {
//     return res.status(400).json({ message: "get current user error" });
//   }
// };

// export const updateAssistant = async (req, res) => {
//   try {
//     const { assistantName, imageUrl } = req.body;
//     let assistantImage;

//     if (req.file) {
//       // If using Cloudinary
//       // assistantImage = await uploadOnCloudinary(req.file.path);
//       assistantImage = req.file.filename; // multer local storage
//     } else {
//       assistantImage = imageUrl;
//     }

//     const user = await User.findByIdAndUpdate(
//       req.userId,
//       { assistantImage, assistantName },
//       { new: true }
//     ).select("-password");

//     if (!user) {
//       return res.status(404).json({ message: "user not found" });
//     }

//     return res.status(200).json(user);
//   } catch (error) {
//     console.error(error);
//     return res.status(400).json({ message: "updateAssistantError user error" });
//   }
// };



import User from "../models/user.model.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js"; // if you use cloudinary

// Get current user
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Get current user error:", error);
    return res.status(400).json({ message: "Error getting current user" });
  }
};

// Update user (assistant name + image)
export const updateUser = async (req, res) => {
  try {
    const { assistantName, imageUrl } = req.body;
    let assistantImage;

    if (req.file) {
      // If using Cloudinary:
      // assistantImage = await uploadOnCloudinary(req.file.path);
      assistantImage = req.file.filename; // multer local storage
    } else {
      assistantImage = imageUrl;
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      { assistantImage, assistantName },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Update user error:", error);
    return res.status(400).json({ message: "Error updating user" });
  }
};
