const asyncHandle = require("express-async-handler");
const user = require("../../models/user/userModel");
const warden = require("../../models/user/wardenModel");
const validateRequired = require("../../utils/validateRequired");
const throwError = require("../../utils/throwError");

//@desc createWarden
//@api /api/users/createUser
//@access private(Admin)
const createWarden = asyncHandle(async function (req, res) {
  const { userId, S_ID, designation, block } = req.body;
  validateRequired(["userId", "S_ID", "designation", "block"], req.body, res);

  const userExists = await user.findById(userId);
  if (!userExists) {
    throwError(404, "User not found", res);
  }

  if (userExists.role !== "warden") {
    throwError(403, "role of user is not warden", res);
  }

  const wardenExists = await warden.findOne({ userId });
  if (wardenExists) {
    throwError(400, "warden already exists", res);
  }
  try {
    const newWarden = await warden.create({
      userId: userId,
      S_ID: S_ID,
      designation: designation,
      block: block,
    });
    res.status(201).json({
      message: "Warden created successfully",
      warden: newWarden,
    });
  } catch (err) {
    console.error(err);
  }
});

module.exports = { createWarden };
