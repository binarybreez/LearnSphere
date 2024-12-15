import { Router } from "express";
import {
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


router.route("/courses").get(verifyJWT, getCourses);
router.route("/add-course").post(verifyJWT, addCourses);
router.route("/update-course/:id").post(verifyJWT, updateCourse);
router.route("/delete-course/:id").post(verifyJWT, deleteCourse);
router.route("/instructor/:id").get(verifyJWT, getInstructor);

export default router;
