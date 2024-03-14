const CatchAsync=require("../Utils/CatchAsync");
const User=require("../Models/userModel");
const jwt=require("jsonwebtoken")
const AppError=require("../Utils/Error");
const {promisify}=require("util");

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
    res.cookie("access_token", token, { httpOnly: true });

    res.status(200).json({
        status:"success",
        message:"user has been sucessfully logged in",
        user,
        token
    })

})
exports.protect = CatchAsync(async (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
     // Dispatch the action to reset user state
      return next(new AppError("You are not logged in", 401));
    }
  
    const decoded = await promisify(jwt.verify)(token, process.env.jwt_secret);
    const user = await User.findById(decoded.id);
  
    if (!user) {
      dispatch(resetUser()); // Dispatch the action to reset user state
      return next(new AppError("The account belonging to this ID no longer exists", 401));
    }
  
    if (user.changedPasswordAfter(decoded.iat)) {
      dispatch(resetUser()); // Dispatch the action to reset user state
      return next(new AppError("The password has been changed after the token has been issued, please login again", 401));
    }
  
    req.user = user;
    next();
  });
  exports.logout=CatchAsync(async(req,res,next)=>{
     res.clearCookie("access_token");
     res.status(200).json({
      status:"success",
      message:"signout suceesfully"
     })
  })
  exports.restrictTo=(...roles)=>{
    return (req,res,next)=>{
      console.log(req.user)
      if(!roles.includes(req.user.role)){
        return next(new AppError('you do not have permission to perform to this action',403));
      }
      next();
    }
  }