const Indent=require("../Models/indentModel");
const CatchAsync=require("../Utils/CatchAsync");
const AppError=require("../Utils/Error");
exports.createIndent=CatchAsync(async(req,res,next)=>{
    const indent=await Indent.create(req.body);
    res.status(200).json({
        status:"success",
        message:"indent created sucessfully",
        indent
    })
})
exports.AllIndent=CatchAsync(async(req,res,next)=>{
    const allIndent=await Indent.find();
    res.status(200).json({
        status:"success",
        message:"Indent Extracted Sucessfully",
        allIndent
    })
})
exports.getIndentbyId=CatchAsync(async(req,res,next)=>{
    const indent=await Indent.findById(req.params.id);
    if(!indent)
    {

    }
    res.status(200).json({
        status:"success",
        message:"Indent Extracted Sucessfully",
        indent
    })
})


exports.getIndentbyUserId=CatchAsync(async(req,res,next)=>{
    const indent=await Indent.find({"userRef":req.params.userId});
    res.status(200).json({
        status:"success",
        message:"Indent Extracted Sucessfully",
        indent
    })
})
exports.sessionHeadApproval = CatchAsync(async (req, res, next) => {
    const indentId = req.params.id;
    const { sessionApproval, materialProprietary, sessionComments } = req.body;
    const indent = await Indent.findById(indentId);

    console.log(indent);

    if (!indent) {
        return next(new AppError("Indent not found", 401));
    }

    let sessionHeadIndex = indent.approvalStages.findIndex((stage) => stage.stageName === "Session Head Approval");

  

    // Check if the stageName was not found
    if (sessionHeadIndex === -1) {
        // If not found, push a new stage with the specified stageName
        indent.approvalStages.push({
            stageName: "Session Head Approval",
            approvedBy: undefined,  // Set the initial value as needed
            materialProprietary: "", // Set the initial value as needed
            comments: "", // Set the initial value as needed
        });

        // Now find the index again
        let newIndex = indent.approvalStages.findIndex((stage) => stage.stageName === "Session Head Approval");

        if (newIndex === -1) {
            return next(new AppError("Error in updating Session Head Approval", 500));
        }

        // Set sessionHeadIndex to the newly found index
        sessionHeadIndex = newIndex;
    }

    // Access and modify the properties
    indent.approvalStages[sessionHeadIndex].approvedBy = sessionApproval === 'yes' ? 'Session Head' : "no";
    indent.approvalStages[sessionHeadIndex].materialProprietary = materialProprietary;
    indent.approvalStages[sessionHeadIndex].comments = sessionComments;

    indent.status = sessionApproval === 'yes' ? "Approved by SessionHead" : "Disapproved by SessionHead";

    await indent.save();

    res.status(200).json({
        status: "success",
        message: "Session Head Approval updated successfully",
        indent,
    });
});
exports.storeManager=CatchAsync(async(req,res,next)=>{
    const indentid=req.params.id;
    const {selectedOption,approval,comments}=req.body;
    console.log(approval)
    const indent=await Indent.findById(indentid);
    if(!indent)
    {
        return next(new AppError("Indent not found",401));
    }
    let sessionIndex=indent.approvalStages.findIndex((stage)=>stage.stageName==="Stock Manager Approval");
    if(sessionIndex===-1)
    {
        indent.approvalStages.push({
            stageName:"Store Manager Approval",
            approvedBy:undefined,
            selectedOption:"",
            comments:""
        })
    }
    let newIndex=indent.approvalStages.findIndex((state)=>state.stageName==="Store Manager Approval");
    if (newIndex === -1) {
        return next(new AppError("Error in updating Session Head Approval", 500));
    }
    sessionIndex=newIndex;
    indent.approvalStages[sessionIndex].selectedOption=selectedOption,
    indent.approvalStages[sessionIndex].approvedBy=approval;
    indent.approvalStages[sessionIndex].comments=comments;
    indent.status=approval==="yes"?"Approved by Store Mananger":"Disapproved by Store Manager";
    await indent.save();
    res.status(200).json({
        status: "success",
        message: "Store Mananger Approval updated successfully",
        indent,
    });

})
