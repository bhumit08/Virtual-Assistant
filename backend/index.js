import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import authRouter from './routes/auth.routes.js'
import cors from "cors"
import cookieParser from "cookie-parser";
import userRouter from './routes/user.routes.js'
// import bodyParser from 'body-parser';

const app=express()
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

const port=process.env.PORT || 5000


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YjdiZGE5MmJhNmQwNzBlYTQyOTQ5OSIsImlhdCI6MTc1Njg3MjEwNX0.KPXrtsHABuMsz32feeDbOA8AmP1uUyJTG82M7sLHvCg

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGI4NTA2NDFkZWQzZDA3Mjc4YWIyOTYiLCJpYXQiOjE3NTcxMzI0NDMsImV4cCI6MTc1Nzk5NjQ0M30.a1gYFrPq9u2iUcDYsOv6fJ4lOLVP90KMerUgtOFYnDA

app.get('/',(req,res)=>{
  res.json("hello worldddddd").status(400)
})

app.use(express.json())
app.use(cookieParser());
app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)


app.listen(port,()=>{
  connectDB()
  console.log(`Server running on http://localhost:${port}`);
})