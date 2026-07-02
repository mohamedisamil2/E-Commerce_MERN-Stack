import asyncHandler from "express-async-handler";
import Users from "../Models/usersModel.js";
import generateToken from "../utils/generateToken.js";

// @desc     create user
// @Method   POST /api/users
const registerUsers = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // find user is exists or not exists
  const existsUser = await Users.findOne({ email });
  if (existsUser) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  // Create new User
  const user = await Users.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
    console.log("Collection Name:", user.collection.name);
  } else {
    res.status(400);
    throw new Error("Invalid User data");
  }
});

// @desc     auth user
// @Method   POST /api/users/auth
const authUsers = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // find user is exists or not exists
  const user = await Users.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc     logout user
// @Method   POST /api/users/logout
function logoutUsers(req, res) {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User Logout Successfully" });
}

// @desc      GET Profile user
// @Method    GET /api/users/profile
const getProfileUsers = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };
  res.status(200).json(user);
});

// @desc     update Profile user
// @Method   PUT /api/users/profile
const updateProfileUsers = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password || user.password;
    }

    // update data of user
    const updateUser = await user.save();
    res.status(200).json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

export {
  registerUsers,
  authUsers,
  logoutUsers,
  updateProfileUsers,
  getProfileUsers,
};
