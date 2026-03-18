const outpass = require("../models/outpassModel");
const asyncHandler = require("express-async-handler");
const validateRequired = require("../utils/validateRequired");

//@desc createOutpass
//@api /api/student/createOutpass
//@access private(student)
const createOutpass = asyncHandler(async function (req, res) {
  const { purpose, location, fromTime, toTime } = req.body;
  validateRequired(
    ["purpose", "location", "fromTime", "toTime"],
    req.body,
    res,
  );
  try {
    const outPass = await outpass.create({
      requestedBy: req.user.user.id,
      purpose,
      location,
      fromTime,
      toTime
    });
    res.status(201).json({
      message: "Outpass Created successfully",
      outPass,
    });
  } catch (err) {
    res.status(500);
    throw err;
  }
});

//@desc getOutpasses
//@api /api/student/getOutpasses
//@access private(student)
const getOutpasses = asyncHandler(async function(req,res){
  try{
    const outpasses=await outpass.find({requestedBy:req.user.user.id});
    res.status(200).json({
      message:"Outpasses fetched successfully",
      outpasses
    })
  }
  catch(err)
  {
    res.status(500);
    throw err;
  }
})
module.exports = { createOutpass,getOutpasses };
