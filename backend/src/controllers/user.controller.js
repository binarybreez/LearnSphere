import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Course } from "../models/courses.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { sendEmail } from "../utils/sendmail.js";
import path from "path";

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
  const { username, email, password, role } = req.body;
  if ([username, email, password, role].some((field) => field?.trim === "")) {
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
  avatarLocalpath = path.join(process.cwd(), "public", "avatar.png");
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
    role,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(409, "An Occured while registering the user.");
  }

  await sendEmail({ email, emailType: "VERIFY", userId: createdUser._id });

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
  const PasswordValid = await user.isPasswordCorrect(password);
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
    .cookie("refreshToken", refreshToken, options)
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
    .json(new ApiResponse(201, "user logged out", {}));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(201).json(new ApiResponse(201, "user details", req.user));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user._id);
  const passwordCorrect = await user.isPasswordCorrect(oldPassword);
  if (!passwordCorrect) {
    throw new ApiError(409, "invalid password");
  }
  user.password = newPassword;
  user.save({ validateBeforeSave: false });
  return res.status(201).json(new ApiResponse(201, "password changed", {}));
});

const addCourses = asyncHandler(async (req, res) => {
  const { title, instructor, category, difficulty, duration, description } =
    req.body;
  if (
    [title, instructor, duration, description].some(
      (field) => field.trim() === ""
    )
  ) {
    throw new ApiError(404, "all required fields not found in the request.");
  }

  const contentLocalpath = req.files?.content[0]?.path;
  if (!contentLocalpath) {
    throw new ApiError(404, "content to upload not found.");
  }

  const content = await uploadOnCloudinary(contentLocalpath);
  if (!content) {
    throw new ApiError(
      404,
      "error occured while uploading file to cloudinary."
    );
  }

  const newCourse = await Course.create({
    title,
    instructor,
    duration,
    description,
    category,
    difficulty,
    content: content?.url,
  });
  const createdCourse = await Course.findById(newCourse._id);
  if (!createdCourse) {
    throw new ApiError(409, "error occured while creating a course.");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, "course created", createdCourse));
});

const getCourses = asyncHandler(async (req, res) => {
  const courses = await Course.find();
  if(!courses) {
    throw new ApiError(404, "no courses found");
  }
  return res.status(201).json(new ApiResponse(201, "courses fetched", courses));
});

const updateCourse = asyncHandler(async (req, res) => {
  const { title, instructor, category, difficulty, duration, description } = req.body;
  const course = await Course.findById(req.params.courseId);
  if (!course) {
    throw new ApiError(404, "course not found");
  }
  
  if(title) course.title = title;
  if(instructor) course.instructor = instructor;
  if(category) course.category = category;
  if(difficulty) course.difficulty = difficulty;
  if(duration) course.duration = duration;
  if(description) course.description = description;
  await course.save({validateBeforeSave: false});
  return res.status(201).json(new ApiResponse(201, "course updated", course));
});

const deleteCourse = asyncHandler(async (req, res) => {  
  const course = await Course.findById(req.params.courseId);
  if (!course) {
    throw new ApiError(404, "course not found");
  }
  await course.deleteOne();
  return res.status(201).json(new ApiResponse(201, "course deleted", {}));
});

const getInstructor = asyncHandler(async(req,res)=>{
  const instructor = await User.findById(req.params.instructorId);
  if(!instructor){
    throw new ApiError(404, "instructor not found");
  }
  return res.status(201).json(new ApiResponse(201, "instructor fetched", instructor));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  changeCurrentPassword,
  addCourses,
  getCourses,
  updateCourse,
  deleteCourse,
  getInstructor,
};
