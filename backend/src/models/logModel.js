const mongoose = require("mongoose");
const logSchema = new mongoose.Schema(
  {
    outpassId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Outpass",
      required: [true, "outpassId field is not filled"],
    },
    scannedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guard",
      required: [true, "scannedBy field is not filled"],
    },
    eventType: {
      type: String,
      enum: ["EXIT", "ENTRY"],
    },
    gateNumber: {
      type: String,
      required: [true, "gateNumber filed is not filled"],
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Log", logSchema);
