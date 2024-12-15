import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
    console.log(token);
    if (!token) {
      throw new ApiError(402, "Unauthorised request.");
    }
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select(
      "-password, -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "Invalid Request by middleware");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(402, "Invalid AccessToken");
  }
});
export { verifyJWT };
