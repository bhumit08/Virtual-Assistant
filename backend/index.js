import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import authRouter from './routes/auth.routes.js'
import cors from "cors"
import cookieParser from "cookie-parser";
import userRouter from './routes/user.routes.js'

dotenv.config()
const app=express()
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
const port=process.env.PORT || 5000

app.use(express.json())
app.use(cookieParser());
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)


app.listen(port,()=>{
  connectDB()
  console.log("server started")
})