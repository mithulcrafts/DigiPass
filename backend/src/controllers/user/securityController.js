const asyncHandle = require("express-async-handler");
const user = require("../../models/user/userModel");
const guard = require("../../models/user/guardModel");
const throwError = require("../../utils/throwError");
const validateRequired = require("../../utils/validateRequired");

//@desc createGuard
//@api /api/users/createUser
//@access private(Admin)
const createGuard = asyncHandle(async function (req, res) {
  const { userId, S_ID, gate } = req.body;
  validateRequired(["userId", "S_ID", "gate"], req.body, res);

  const userExists = await user.findById(userId);

  if (!userExists) {
    throwError(404, "User not found", res);
  }

  if (userExists.role !== "guard") {
    throwError(403, "User role is not guard", res);
  }

  const guardExists = await guard.findOne({ userId });
  if (guardExists) {
    throwError(400, "Guard already exists", res);
  }

  try{
    const newGuard = await guard.create({
    userId: userId,
    S_ID: S_ID,
    gate: gate,
  });
  res.status(201).json({
    message: "Guard created successfully",
    guard: newGuard,
  });
  }catch(err)
  {
    console.error(err);
  }
});

module.exports = { createGuard };
