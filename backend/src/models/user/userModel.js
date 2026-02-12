const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name has not been entered"]
    },
    email:{
        type:String,
        required:[true,"Email has not been entered"],
        unique:true,
        index:true
    },
    password:{
        type:String,
        required:[true,"Password missing"]
    },
    phoneNumber:{
        type:String,
        required:[true,"Phone number not entered"],
        unique:true,
        index:true
    },
    role:{
        type:String,
        enum:["student","guard","warden","admin"],
        required:[true,"Role not entered"]
    }
},{timestamps:true});

module.exports=mongoose.model('User',userSchema);