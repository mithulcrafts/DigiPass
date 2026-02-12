const mongoose=require('mongoose');
const studentSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"User ID not entered"],
        unique:true,
        index:true
    },
    rollNumber:{
        type:String,
        required:[true,'Roll Number not entered'],
        unique:true
    },
    branch:{
        type:String,
        required:[true,'Branch not entered']
    }
},{timestamps:true});
module.exports=mongoose.model('Student',studentSchema);