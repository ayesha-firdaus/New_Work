const User=require("../Models/userModel");
const CatchAsync=require("../Utils/CatchAsync");
const AppError=require("../Utils/Error");
exports.update=CatchAsync(async function(req,res,next){
  if(req.user.id!==req.params.id)
  {
    return next(new AppError("you can only update your information",401))
  }
  const user=await User.findByIdAndUpdate(req.params.id,{
   $set:{ name:req.body.name,
    email:req.body.email,
    designation:req.body.designation,
photo:req.bodyphoto,
    
   
  }},{new:true});
  res.status(200).json({
    status:"success",
    message:"your account is sucessfully updated",
    user,
  })
})