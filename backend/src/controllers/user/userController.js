const bcrypt = require("bcrypt"); //For storing password securely
const User = require("../../models/user/userModel");
const asyncHandle = require("express-async-handler");
const validateRequired = require("../../utils/validateRequired");

//@desc createUser
//@api /api/users/createUser
//@access private(Admin)
const createUser = asyncHandle(async function (req, res) {
  const { name, email, password, phoneNumber, role } = req.body;
  validateRequired(
    ["name", "email", "password", "phoneNumber", "role"],
    req.body,
    res,
  );

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10); //first argument is the one which we want to hash, second argument tells how many solving rounds needs to be done
  try {
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      phoneNumber: phoneNumber,
      role: role,
    });
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phoneNumber: newUser.phoneNumber,
        role: newUser.role,
      },
    });
  } catch (err) {
    res.status(500);
    throw err;
  }
});

//@desc getUser
//@api /api/users/me
//@access private
const getUser = asyncHandle(async function (req, res) {
  try {
    const reqUser = await User.findById(req.user.user.id);
    if (!reqUser) {
      res.status(404);
      throw new Error("User data not found");
    }
    res.json(reqUser);
  } catch (err) {
    res.status(500);
    throw err;
  }
});

//@desc getUserById
//@api /api/users/:id
//@access private(student), warden,guard,admin
const getUserById = asyncHandle(async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
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
    res.status(200).json(user);
  } catch (err) {
    res.status(500);
    throw err;
  }
});
module.exports = { createUser, getUser, getUserById };
