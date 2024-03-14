const User=require("../Models/userModel");
const CatchAsync=require("../Utils/CatchAsync");
const AppError=require("../Utils/Error");
exports.update = CatchAsync(async function (req, res, next) {
  if (req.user.id !== req.params.id) {
    return next(new AppError("You can only update your information", 401));
  }

  // Create a new user instance with the updated data
  const updatedUserData = {
    name: req.body.name,
    email: req.body.email,
    designation: req.body.designation,
    photo: req.body.photo,
    // ... other fields
  };

  const user = new User(updatedUserData);



  // Validation passed, now update the document
  const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedUserData, {
    new: true,runValidators:true
  });

  res.status(200).json({
    status: "success",
    message: "Your account is successfully updated",
    user: updatedUser,
  });
});