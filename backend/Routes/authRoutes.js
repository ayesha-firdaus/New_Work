const express=require("express");
const router=express.Router();
const {starter}=require("../Controller/authController");
router.get("/",starter);
module.exports=router;