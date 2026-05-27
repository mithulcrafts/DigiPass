const express=require('express');
const {userStats}=require('./userController');
const {outpassStats}=require('../outPassController');
const {movementStats}=require('../logController');
const asyncHandle = require("express-async-handler");

//@desc getStats
//@api /api/admin/stats
//@access private(admin)
const getStats=asyncHandle(async function (req,res){
    const user_stats=await userStats();
    const outpass_stats=await outpassStats();
    const movement_stats=await movementStats();
    res.status(200).json({
        userStats:user_stats,
        outpassStats:outpass_stats,
        movementStats:movement_stats
    })
});

module.exports={getStats};