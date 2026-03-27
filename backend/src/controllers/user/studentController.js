const asyncHandle = require("express-async-handler");
const Student = require("../../models/user/studentModel");
const User = require("../../models/user/userModel");
const validateRequired = require("../../utils/validateRequired");
const throwError = require("../../utils/throwError");

//@desc createStudent
//@api /api/users/createStudent
//@access private(Admin)
const createStudent = asyncHandle(async function (req, res) {
  const { userId, rollNumber, branch, hostel, roomNumber } = req.body;
  validateRequired(["userId", "rollNumber", "branch"], req.body, res);

  const userExists = await User.findById(userId);

  if (!(userExists.role === "student")) {
    throwError(403, "Role of error is not student", res);
  }

  const studentExists = await Student.findOne({ userId });
  if (studentExists) {
    throwError(400, "Student already exists", res);
  }

  const newStudent = await Student.create({
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
const getStudent = asyncHandle(async function (req, res) {
  const reqStudent = await Student.findOne({ userId: req.user.user.id });
  if (!reqStudent) {
    throwError(404, "Student data not found", res);
  }
  res.json(reqStudent);
});

//@desc getStudentById
//@api /api/student/:id
//@access private(student), warden,guard,admin
const getStudentById = asyncHandle(async function (req, res) {
  try {
    const student = await Student.findOne({ userId: req.params.id });
    if (!student) {
      res.status(404);
      throw new Error("User not found");
    }
    if (
      req.user.user.role === "student" &&
      req.params.id !== req.user.user.id
    ) {
      res.status(403);
      throw new Error("Access denied");
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500);
    throw err;
  }
});
module.exports = { createStudent, getStudent, getStudentById };
