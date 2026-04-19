const mongoose=require('mongoose');
const outpassSchema=mongoose.Schema({
    requestedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User", 
        required:[true,"requestedBy field is not filled"],
        index:true
    },
    status:{
        type:String,
        enum:["Approved","Rejected","Pending","Expired","Completed"],
        default:"Pending"
    },
    eventTime:{ //Contains the details like approved/rejected time
        type:Date,
    },
    eventBy:{ //Contains the details of who approved/rejected
        type:mongoose.Schema.Types.ObjectId, 
        ref:"User",
    },
    purpose:{
        type:String,
        required:[true,"purpose field is empty"]
    },
    location:{
        type:String,
        required:[true,"location field is empty"]
    },
    fromTime:{
        type:Date,
        required:[true,"fromTime field is empty"]
    },
    toTime:{
        type:Date,
        required:[true,"toTime field is empty"]
    },
    qrToken:{
        type:String,
        unique:true,
        sparse:true,
        default:undefined
    },
},{timestamps:true});
module.exports=mongoose.model('Outpass',outpassSchema);