const CatchAsync=require("../Utils/CatchAsync");
const User=require("../Models/userModel");
const jwt=require("jsonwebtoken")
exports.signup=CatchAsync(async(req,res,next)=>{
   const newuser=await User.create({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    passwordConfirm:req.body.passwordConfirm,
    photo:req.body.photo
})
const token=jwt.sign({id:newuser._id},process.env.jwt_secret,process.env.jwt_expires_in);
res.status(200).json({
    status:"Success",
    message:"User SignedIn Successfully",
    token,
    newuser
})

}
)