const Item=require("../Models/itemModel");
const CatchAsync=require("../Utils/CatchAsync");
exports.newitem=CatchAsync(async(req,res,next)=>{
    const item=await Item.create({
     itemname:req.body.itemname,
     category:req.body.category,
     units:req.body.units,
     itemcode:req.body.itemcode,
     description:req.body.description,
    });
    res.status(200).json({
        status:"success",
        message:"item sucessfully created",
        item
    })
})
exports.getItembyCategory=CatchAsync(async(req,res,next)=>{
    console.log(req.params.category)
  const item=await Item.find({category:req.params.category});
  res.status(200).json({
    status:"sucess",
    message: `${req.params.category} item extracted sucessfully`,
    item
  })

})
exports.getItems=CatchAsync(async(req,res,next)=>{
    
  const item=await Item.find();
  res.status(200).json({
    status:"sucess",
    message:"item extracted sucessfully",
    item
  })

})