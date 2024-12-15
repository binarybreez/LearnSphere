import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  changeCurrentPassword,
  getInstructorCourse
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


const router = Router();

router
  .route("/register-user")
  .post(upload.fields([{ name: "avatar", maxCount: 1 }]), registerUser);

router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/get-user").get(verifyJWT, getCurrentUser);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/get-instructor-course").get(verifyJWT, getInstructorCourse);




export default router;
