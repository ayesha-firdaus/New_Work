const express=require("express")
const authController=require("../Controller/authController");
const {newitem,getItembyCategory,getItems, getPendingItems,ApprovalItem}=require("../Controller/itemController");
const router=express.Router();
router.post("/newitem",newitem);
router.get("/viewitem/:category",getItembyCategory)
router.get("/viewitem",getItems)
router.get("/viewpendingitem",getPendingItems);
router.post("/approvenewitem/:id",authController.protect,authController.restrictTo('StoreManager'),ApprovalItem)
module.exports=router;