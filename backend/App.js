const express=require("express");
const app=express();
const userRouter=require("../backend/Routes/userRoutes.js")
const authRouter=require("./Routes/authRoutes.js")
const itemRouter=require("./Routes/itemRoutes.js");
const indentRouter=require("./Routes/indentRoutes.js");
const morgan=require("morgan");
const globalErrorHandler=require("../backend/Controller/errorController.js")
const dotenv=require("dotenv");
const AppError=require("../backend/Utils/Error.js")
const mongoose=require("mongoose")
const cookieparser=require("cookie-parser");
dotenv.config();
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieparser());
const db=process.env.Database;
mongoose.connect(db).then(con=>{
    console.log("Database Connected Sucessfully");
})
app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)
app.use("/api/item",itemRouter)
app.use("/api/indent",indentRouter);

app.all('*',(req,res,next)=>{
    next(new AppError('Invalid Route',400));
  })
app.use(globalErrorHandler);

module.exports=app;