import express from "express";
import { singUp, logOut, Login } from "../controllers/auth.controllers.js";

const authRouter = express.Router();

authRouter.post("/signup", singUp);
authRouter.post("/signin", Login);
authRouter.post("/logout", logOut);

export default authRouter;