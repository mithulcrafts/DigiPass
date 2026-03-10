const outpass = require("../models/outpassModel");
const asyncHandler = require("express-async-handler");
const validateRequired=require("../utils/validateRequired");

//@desc createOutpass
//@api /api/student/createOutpass
//@access private(student)
const createOutpass = asyncHandler(async function (req, res) {
  const { requestedBy,purpose, location, fromTime, toTime } = req.body;
  validateRequired(["purpose","location","fromTime","toTime"],req.body,res);
  const outPass=await outpass.create({
    requestedBy,
    purpose,
    location,
    fromTime,
    toTime
  });
  res.status(201).json({
    message:"Outpass Created successfully",
    outPass
  })
});
module.exports = { createOutpass };
