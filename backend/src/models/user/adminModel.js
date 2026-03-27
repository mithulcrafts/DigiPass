const mongoose = require('mongoose');
const adminSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"User Id not entered"],
        unique:true,
        index:true
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
module.exports=mongoose.model('Admin',adminSchema);