const express=require("express");
const router=express.Router();
const {starter}=require("../Controller/userController");
router.get('/',starter);
module.exports=router;