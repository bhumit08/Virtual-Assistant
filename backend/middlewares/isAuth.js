import jwt from "jsonwebtoken";

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token, not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId;
    next();
  } catch (error) {
    console.error("Auth error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default isAuth;




// import jwt from 'jsonwebtoken'
// const isAuth=async(req,res,next)=>{
//   try{
//       const token=req.cookies.token
//       if(!token){
//         return res.status(400).json({message:"token not found"})
//       }
//       const verifyToken=await jwt.verify(token,process.env.JWT_SECRET)
//       req.userId=verifyToken.userId

//       next()


//   }catch(error){
//        console.log(error)
//        return res.status(500).json({message:"is Auth Error"})
//   }
// }

// export default  isAuth



// import jwt from 'jsonwebtoken';

// const isAuth = (req, res, next) => {
//   try {
//     const token = req.cookies?.token;

//     if (!token) {
//       return res.status(401).json({ message: "Token not found, please login" });
//     }

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     req.userId = decoded.userId; // Attach userId to request

//     next(); // Continue to next middleware/controller
//   } catch (error) {
//     console.error("isAuth Error:", error.message);

//     return res.status(401).json({
//       message: "Invalid or expired token, please login again"
//     });
//   }
// };

// export default isAuth;
