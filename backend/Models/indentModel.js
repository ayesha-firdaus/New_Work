const mongoose=require("mongoose")
const validator=require("validator");
const indentSchema=new mongoose.Schema({
    indenterName:{
        type:String,
        required:[true,"indent must have a name"],
      
    },
    section:{
        type:String,
        required:[true,"indent must hace a department"],
    },
    capitalGoods:{
       equipment: {type:Boolean,default:false,required:true},
      fixture: {type:Boolean,default:false,required:true},
      furniture: {type:Boolean,default:false,required:true},
    },
    GeneralItemORstationary: {SemiConsumables: {type:Boolean,default:false,required:true}, Consumables: {type:Boolean,default:false,required:true}, AnyOther: {type:Boolean,default:false,required:true}},
    Services: {JobWork: {type:Boolean,default:false,required:true}, Printing: {type:Boolean,default:false,required:true}, AnyOther: {type:Boolean,default:false,required:true}},
    accounthead:{
        RD: {type:Boolean,default:false,required:true},
        general: {type:Boolean,default:false,required:true},
        project: {type:Boolean,default:false,required:true},
    },
    budget: {
        type:Number,
        required:true
    },
    amount: {
        type:Number,
        required:true
    },
    applicationOfItems: {
        type:String,
        required:[true,"indent must hace a department"],
    },
    itemArray:{
        type:[Object],
        required:true,
    },
    comment:{
        type:String,
        required:true,
    },
    userRef:{
        type:String,
        required:true,
  
    },
    status:{
        type:String,
        deafult:"pending"
    },
    sessionHead:{
        type:String,
    },
    year:{
        type:String,
        required:true,
    },
    requisition:{
        type:Boolean,
        required:true                                           
        
    },

    approvalStages: [
        {
            stageName: { type: String, default: "Session Head Approval" },
            approvedBy: { type: String, default: null },
            materialProprietary: { type: String, default: "" },
            comments: { type: String, default: "" }
        },
        {
            stageName: { type: String, default: "Stock Manager Approval" },
           selectedOption:"",
           approvedBy:"",
            comments: { type: String, default: "" }
        },
        {
            stageName: { type: String, default: "Admin Approval" },
            approvedBy: { type: String, default: null },
          
        }
    ]

    

},{
    timestamps:true
})
const Indent=mongoose.model('indent',indentSchema);
module.exports=Indent;