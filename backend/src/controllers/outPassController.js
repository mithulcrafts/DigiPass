const Outpass = require("../models/outpassModel");
const asyncHandler = require("express-async-handler");
const validateRequired = require("../utils/validateRequired");
const generateToken = require("../utils/generateToken");
//@desc createOutpass
//@api /api/outpass/createOutpass
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
//@api /api/outpass/getOutpass/:id
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

//@desc getAllOutpass
//@api /api/outpass/getAllOutpasses
//@access warden,admin
const getAllOutpasses = asyncHandler(async (req, res) => {
  const outPasses = await Outpass.find();
  res.status(200).json({
    message: "Outpasses fetched successfully",
    outPasses,
  });
});

//@desc updateOutpass
//@api /api/outpass/:id/status
//@access warden
const updateOutpass = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const allowed = ["Approved", "Rejected"];
  if (!allowed.includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }
  const outpassId = req.params.id;
  const outpass = await Outpass.findById(outpassId);
  if (!outpass) {
    res.status(404);
    throw new Error("Outpass not found");
  }
  outpass.status = status;
  outpass.eventTime = new Date();
  outpass.eventBy = req.user.user.id;
  if (outpass.status == "Approved") {
    const token = generateToken();
    outpass.qrToken = token;
  }
  await outpass.save();
  res.status(200).json({
    message: "Outpass updated successfully",
    outpass,
  });
});

//@desc verifyOutpass
//@api /api/outpass/verify/:token/
//@access public
const verifyOutpass = asyncHandler(async (req, res) => {
  const token = req.params.token;
  if (!token) {
    return res.status(400).json({ message: "Token not passed" });
  }
  const outpass = await Outpass.findOne({ qrToken: token });
  if (!outpass) {
    return res.status(400).json({ message: "Invalid QR" });
  }
  if (outpass.status === "Expired") {
    return res.status(400).json({ message: "Expired" });
  }

  if (outpass.status !== "Approved") {
    return res.status(400).json({ message: "Not approved" });
  }
  if (new Date() > new Date(outpass.toTime)) {
    outpass.status = "Expired";
    await outpass.save();
    return res.status(400).json({ message: "Expired" });
  }
  return res.status(200).json({
    message: "Valid Outpass",
    outpass,
  });
});
module.exports = {
  createOutpass,
  getOutpasses,
  getOutpass,
  getAllOutpasses,
  updateOutpass,
  verifyOutpass,
};
