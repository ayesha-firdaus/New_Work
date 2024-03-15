const Item=require("../Models/itemModel");
const CatchAsync=require("../Utils/CatchAsync");
exports.newitem=CatchAsync(async(req,res,next)=>{
    const item=await Item.create({
     itemname:req.body.itemname,
     category:req.body.category,
     unit:req.body.unit,
     itemcode:req.body.itemcode,
     description:req.body.description,
     status:req.body.status,
     userRef:req.body.userRef,
     userName:req.body.userName
    });
    res.status(200).json({
        status:"success",
        message:"item sucessfully created",
        item
    })
})
exports.getItembyCategory=CatchAsync(async(req,res,next)=>{
    console.log(req.params.category)
  const item=await Item.find({category:req.params.category,status:"approved"});
  res.status(200).json({
    status:"success",
    message: `${req.params.category} item extracted sucessfully`,
    item
  })

})
exports.getItems=CatchAsync(async(req,res,next)=>{
    
  const item=await Item.find();
  res.status(200).json({
    status:"success",
    message:"item extracted sucessfully",
    item
  })

})
exports.getPendingItems=CatchAsync(async(req,res,next)=>{
  const item=await Item.find({"status":"pending"});
  res.status(200).json({
    status:"success",
    message:"pending item extracted sucessfully",
    item

  })
})
exports.ApprovalItem=CatchAsync(async(req,res,next)=>{
  console.log(req.params.id)
  const item=await  Item.findOne({_id:req.params.id});
  if(item===null||item==="")
  {
    return next(new AppError("No such item with the specified id", 401));
  }


  item.status=req.body.status;
await item.save({validateBeforeSave:false});
  res.status(200).json({
    status:"success",
    message:"status updated sucessfully",
    item
  })
})