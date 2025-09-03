
import express from "express";
import { getCurrentUser, updateUser } from "../controllers/user.controllers.js";
import isAuth from "../middlewares/isAuth.js";

const userRouter = express.Router();

// Get current user
userRouter.get("/current", isAuth, getCurrentUser);

// Update user (assistant name, image, etc.)
userRouter.post("/update", isAuth, updateUser);

export default userRouter;

