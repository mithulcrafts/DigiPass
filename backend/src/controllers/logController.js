const Log = require("../models/logModel");
const asyncHandler = require("express-async-handler");
const { userStats } = require("./user/userController");

async function movementStats() {
  const { userCount, studentCount, guardCount, wardenCount } =
    await userStats();
  const exitCount = await Log.countDocuments({ eventType: "Exit" });
  const entryCount = await Log.countDocuments({ eventType: "Entry" });
  const outCount = exitCount - entryCount;
  const inCount = studentCount - outCount;
  return {
    outCount,
    inCount,
  };
}

//@desc getMovementStats
//@api /api/log/movementStats
//@access private(warden,admin)
const getMovementStats = asyncHandler(async (req, res) => {
  try {
    const stats = await movementStats();
    res.json(stats);
  } catch (err) {
    console.log(err);
    throw err;
  }
});

module.exports = { movementStats,getMovementStats };
