const express=require("express");
const router=express.Router();
const {update}=require("../Controller/userController");
const {protect}=require("../Controller/authController");
router.patch("/update/:id",protect,update);
module.exports=router;
