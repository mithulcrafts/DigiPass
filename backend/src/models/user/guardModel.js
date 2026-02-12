const mongoose = require('mongoose');
const guardSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"User Id not entered"],
        unique:true,
        index:true
    },
    staffId:{
        type:String,
        required:[true,"staffId not entered"],
        unique:true
    },
    gate:{
        type:String,
        required:[true,"Gate not entered"]
    }
},{timestamps:true});
module.exports=mongoose.model('Guard',guardSchema);