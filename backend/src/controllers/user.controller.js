import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import {User} from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const generateAccessAndRefreshToken = async (userid) => {
  try {
    const user = await User.findById(userid);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while generating the access and refresh tokens"
    );
  }
};

const options = {
  httpOnly: true,
  secure: true,
};

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  // console.log("req.body = ", req.body);
  if ([username, email, password].some((field) => field?.trim === "")) {
    throw new ApiError(
      400,
      "all of the fields are required to register the user"
    );
  }
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) {
    throw new ApiError(409, "User already exists with this username or email");
  }

  let avatarLocalpath;
  if (
    req.files &&
    Array.isArray(req.files.avatar) &&
    req.files.avatar.length > 0
  ) {
    avatarLocalpath = req.files.avatar[0].path;
  }
  const avatar = await uploadOnCloudinary(avatarLocalpath);
  const user = await User.create({
    username: username.toLowerCase(),
    email,
    password,
    avatar: avatar?.url || "",
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(409, "An Occured while registering the user.");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, "user registered", createdUser));
});

const loginUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if ([username, email, password].some((field) => field?.trim === "")) {
    throw new ApiError(409, "enter all credentials to login.");
  }
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });
  if (!user) {
    throw new ApiError(409, "user not found");
  }
  const PasswordValid = await User.isPasswordCorrect(password);
  if (!PasswordValid) {
    throw new ApiError(409, "Invalid Login Credentials");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  return res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .cookies("refreshToken", refreshToken, options)
    .json(new ApiResponse(201, "user logged in", loggedInUser));
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    { new: true }
  );
  return res
    .status(201)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(201, "user logged out",{}));
});

export { registerUser, loginUser, logoutUser };