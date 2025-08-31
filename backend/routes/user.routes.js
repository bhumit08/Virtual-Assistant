// import express from "express";
// import { getCurrentUser } from "../controllers/user.controllers.js";

// const userRouter = express.Router();

// userRouter.get("/current",isAuth,getCurrentUser)

// export default userRouter;


import express from "express";
import { getCurrentUser } from "../controllers/user.controllers.js";
import isAuth from "../middlewares/isAuth.js"; // <-- Add this line

const userRouter = express.Router();

userRouter.get("/current", isAuth, getCurrentUser);

export default userRouter;
