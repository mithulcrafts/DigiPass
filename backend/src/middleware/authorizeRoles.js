const authorizeRoles=(...allowedRoles)=>{
    return (req,res,next)=>{
        if(!allowedRoles.includes(req.user.user.role))
        {
            return res.status(403).json({message:"Access denied"});
        }
        next();
    }
}
module.exports=authorizeRoles;