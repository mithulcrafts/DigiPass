const Outpass = require("../models/outpassModel");
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
    const outPass = await Outpass.create({
      requestedBy: req.user.user.id,
      purpose,
      location,
      fromTime,
      toTime,
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
//@api /api/outpass/getOutpasses
//@access private(student)
const getOutpasses = asyncHandler(async function (req, res) {
  try {
    const outpasses = await Outpass.find({ requestedBy: req.user.user.id });
    res.status(200).json({
      message: "Outpasses fetched successfully",
      outpasses,
    });
  } catch (err) {
    res.status(500);
    throw err;
  }
});

//@desc getOutpass
//@api /api/student/getOutpass/:id
//@access private(student), warden,admin,guard
const getOutpass = asyncHandler(async (req, res) => {
  try {
    const outpass = await Outpass.findById(req.params.id);
    if (!outpass) {
      res.status(404);
      throw new Error("Outpass not found");
    }
    if (
      req.user.user.role === "student" &&
      outpass.requestedBy.toString() !== req.user.user.id
    ) {
      res.status(403);
      throw new Error("Access denied");
    }
    res.status(200).json(outpass);
  } catch (err) {
    res.status(500);
    throw err;
  }
});
module.exports = { createOutpass, getOutpasses, getOutpass };
