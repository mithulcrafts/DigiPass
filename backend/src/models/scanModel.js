const mongoose=require('mongoose');
const scanSchema=mongoose.Schema({
    gate:{
        type:String,
        required:[true,"gate field is not filled"]
    },
    scannedBy:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"User",
        required:[true,"scannedBy field is not filled"],
        index:true
    },
    scannedTime:{
        type:Date,
        default:Date.now,
        required:[true,"scannedTime field is not filled"]
    },
    eventType:{
        type:String,
        enum:["Entry","Exit"],
        required:[true,"eventType field is not filled"]
    },
    outpassId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Outpass",
        index:true
    }
},{timestamps:true});
module.exports=mongoose.model('Scan',scanSchema);