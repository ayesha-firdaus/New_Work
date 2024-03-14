const express=require("express")
const {newitem,getItembyCategory,getItems}=require("../Controller/itemController");
const router=express.Router();
router.post("/newitem",newitem);
router.get("/viewitem/:category",getItembyCategory)
router.get("/viewitem",getItems)
module.exports=router;