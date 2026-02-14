const user=require('../models/user/userModel'); //Importing user schema
const bcrypt = require('bcrypt'); //bcrypt for comparing passwords
const jwt=require('jsonwebtoken'); //For generating and sending JWT
const asyncHandle = require('express-async-handler'); //For async handling

//@desc userSignIn
//@api /api/login
//@access public
const signin=asyncHandle(async function(req,res){
    const {email,password}=req.body;
    //We check if both email and password are entered or not
    if(!email||!password)
    {
        res.status(400);
        throw new Error ('Email or password not entered');
    }
    //We check if the user exists with help of email
    const userExists=await user.findOne({email});
    if(userExists)
    {
        //We check if the password entered by user matches with correct password
        const isMatch=await bcrypt.compare(password,userExists.password);
        if(isMatch)
        {
            //Creating JSON Web Token (JWT)
            const accessToken=jwt.sign({
                user:{
                    name:userExists.name,
                    email:email,
                    id:userExists._id,
                    role:userExists.role
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn:"1m"}
        );
            //Sending access token as response
            res.status(200).json({accessToken});
        }
        else
        {
            res.status(401);
            throw new Error('Incorrect Email or password');
        }
    }
    else
    {
        res.status(401);
        throw new Error ('Email not found');
    }
});
module.exports={signin};