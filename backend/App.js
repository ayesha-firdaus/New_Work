const express=require("express");
const app=express();
const userRouter=require("../backend/Routes/userRoutes.js")
const authRouter=require("./Routes/authRoutes.js")
const morgan=require("morgan");
const globalErrorHandler=require("../backend/Controller/errorController.js")
const dotenv=require("dotenv");
const AppError=require("../backend/Utils/Error.js")
const mongoose=require("mongoose")
dotenv.config();
app.use(express.json());
app.use(morgan('dev'));
const db=process.env.Database;
mongoose.connect(db).then(con=>{
    console.log("Database Connected Sucessfully");
})
app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)
app.all('*',(req,res,next)=>{
    next(new AppError('Invalid Route',400));
  })
app.use(globalErrorHandler);

module.exports=app;