const mongoose=require('mongoose');
const wardenSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,'User ID not entered'],
        unique:true,
        index:true
    },
    block:{
        type:String,
        required:[true,"block not entered"]
    },
    S_ID:{
        type:String,
        required:[true,"S_ID not entered"],
        unique:true
    },
    designation:{
        type:String,
        required:[true,"designation not entered"]
    }
},{timestamps:true});
module.exports=mongoose.model('Warden',wardenSchema);