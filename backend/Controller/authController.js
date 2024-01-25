const CatchAsync=require("../Utils/CatchAsync");
const User=require("../Models/userModel");
const jwt=require("jsonwebtoken")
const AppError=require("../Utils/Error");
exports.signup=CatchAsync(async(req,res,next)=>{
 
   const newuser=await User.create({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    passwordConfirm:req.body.passwordConfirm,
    photo:req.body.photo,
    designation:req.body.designation,
})
const token=jwt.sign({id:newuser._id},process.env.jwt_secret,{expiresIn:process.env.jwt_expires_in});
res.status(200).json({
    status:"Success",
    message:"User SignedIn Successfully",
    token,
    newuser
})

}
)
exports.login=CatchAsync(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email||!password)
    {
      return next(new AppError("Email or Password is not given",401));
    }
    const user=await User.findOne({email}).select('+password');
    if(!user|| !(await user.validatePassword(password,user.password))){
        return next(new AppError("Email or password is incorrect",401));
    }
    const token=jwt.sign({id:user._id},process.env.jwt_secret,{expiresIn:process.env.jwt_expires_in});
    res.cookie("access_token",token,{httpOnly:true});
    res.status(200).json({
        status:"success",
        message:"user has been sucessfully logged in",
        user,
        token
    })

})