const asyncHandle=require("express-async-handler");
const user=require("../../models/user/userModel");
const guard=require("../../models/user/guardModel");
const throwError=require("../../utils/throwError");
const validateRequired=require("../../utils/validateRequired");

//@desc createGuard
//@api /api/admin/createUser
//@access private(Admin)
const createGuard=asyncHandle(async function (req,res) {
    const {userId,S_ID,gate}=req.body;
    validateRequired(["userId","S_ID","gate"],req.body,res);

    userExists=await user.findById(userId);
    
    if(userExists.role!=="guard")
    {
        throwError(403,"User role is not guard",res);
    }

    const guardExists=await guard.findOne({userId});
    if(guardExists)
    {
        throwError(400,"Guard already exists",res);
    }

    const newGuard=await guard.create({
        userId:userId,
        S_ID:S_ID,
        gate:gate
    });

    res.status(201).json({
        message:"Guard created successfully",
        guard:newGuard
    });
});

module.exports={createGuard};