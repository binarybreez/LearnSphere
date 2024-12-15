import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const instructorOnly = asyncHandler(async (req, _, next) => {
  try {
    const { user } = req.user;
    const instructor = await user?.isInstructor();
    if (!user) {
      throw new ApiError(404, "user not found");
    }
    if (!instructor) {
      throw new ApiError(409, "only instructor can access this page.");
    }
    next();
  } catch (error) {
    throw new ApiError(409, "invalid access.");
  }
});

export { instructorOnly };
