const bcrypt = require("bcrypt"); //For storing password securely
const user = require("../models/user/userModel");
const asyncHandle = require("express-async-handler");

//@desc createUser
//@api /api/admin/createUser
//@access private(Admin)
const createUser = asyncHandle(async function (req, res) {
  const { name, email, password, phoneNumber, role } = req.body;
  if (!name || !email || !password || !phoneNumber || !role) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userExists=await user.findOne({email});
  if(userExists)
  {
        res.status(400);
        throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10); //first argument is the one which we want to hash, second argument tells how many solving rounds needs to be done
  const newUser = await user.create({
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
});
module.exports = { createUser };
