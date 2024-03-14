const {createIndent, AllIndent,getIndentbyId,sessionHeadApproval,storeManager,getIndentbyUserId}=require("../Controller/indentController");
const authController=require("../Controller/authController");
const express=require("express");
const router=express.Router();
router.post("/create",createIndent);
router.get("/view",AllIndent);
router.get("/:id",getIndentbyId);
router.get("/user/:userId",getIndentbyUserId)
router.post("/updateSessionHeadApproval/:id",authController.protect,authController.restrictTo('SessionHead') ,sessionHeadApproval);
router.post('/updateStoreManager/:id',authController.protect,authController.restrictTo('StoreManager'),storeManager);
module.exports=router;