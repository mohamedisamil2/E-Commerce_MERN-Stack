import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import Users from "../Models/usersModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_NODE);
      req.user = await Users.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not auhorized, Invalid Token");
    }
  } else {
    res.status(401);
    throw new Error("Not auhorized, Invalid Token");
  }
});

export { protect };
