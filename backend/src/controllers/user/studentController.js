const asyncHandle = require("express-async-handler");
const student = require("../../models/user/studentModel");
const user = require("../../models/user/userModel");
const validateRequired = require("../../utils/validateRequired");
const throwError = require("../../utils/throwError");

//@desc createStudent
//@api /api/admin/createStudent
//@access private(Admin)
const createStudent = asyncHandle(async function (req, res) {
  const { userId, rollNumber, branch, hostel, roomNumber } = req.body;
  validateRequired(["userId", "rollNumber", "branch"], req.body, res);

  const userExists = await user.findById(userId);

  if (!(userExists.role === "student")) {
    throwError(403, "Role of error is not student", res);
  }

  const studentExists = await student.findOne({ userId });
  if (studentExists) {
    throwError(400, "Student already exists", res);
  }

  const newStudent = await student.create({
    userId: userId,
    rollNumber: rollNumber,
    branch: branch,
    hostel: hostel,
    roomNumber: roomNumber,
  });
  res.status(201).json({
    message: "Student created successfully",
    student: newStudent,
  });
});

//@desc getStudent
//@api /api/student/me
//@access private(student)
const getStudent=asyncHandle(async function (req,res) {
    const reqStudent=await student.findOne({userId:req.user.user.id});
    if(!reqStudent)
    {
      throwError(404,"Student data not found",res);
    }
    res.json(reqStudent);
})

module.exports = { createStudent, getStudent };