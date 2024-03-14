const mongoose=require("mongoose");
const  itemSchema=new mongoose.Schema({
    itemname:{
        type:String,
        required:[true,"an item must have an itemname"]
    },
    category:{
        type:String,
        enum:{
            values:["Stationary","Electronics","Cleaning"],
            message:["items can either ne electronics,stationary or under cleaning"],
        },
        required:[true,"category is required"]
       
    },
    itemcode:{
        type:String,
        required:[true,"itemcode is needed"],

    },
    units:{
        type:String,
        required:true
    },
    description:{
       type:String,
       required:true
    },
    userRef:{
        type:String,
    }

},{
    timestamps:true
})
const Item=mongoose.model("item",itemSchema);
module.exports=Item;