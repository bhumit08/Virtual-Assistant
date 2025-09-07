

import express from "express";
import { askToAssistant, getCurrentUser, updateAssistant } from "../controllers/user.controllers.js";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.get("/current", isAuth, getCurrentUser);

// ✅ route expects multipart form with key = "assistantImage"
userRouter.post("/update", isAuth, upload.single("assistantImage"), updateAssistant);
userRouter.post("/asktpassistant", isAuth, askToAssistant);


export default userRouter;
