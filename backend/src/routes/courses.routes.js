import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  addCourses,
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  enrollInCourse,
  unenrollFromCourse,
  addReview,
  getInstructor,
  addLesson,
  getLessons,
  updateLesson,
  deleteLesson,
} from "../controllers/user.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router
  .route("/add-course")
  .post(
    verifyJWT,
    upload.fields([{ name: "content", maxCount: 1 }]),
    addCourses
  );
router
  .route("/lessons")
  .post(
    verifyJWT,
    upload.fields([{ name: "content", maxCount: 1 }]),
    addLesson
  );
router.route("/").get(verifyJWT, getCourses);
router.route("/course").get(verifyJWT, getCourse);
router.route("/course").put(verifyJWT, updateCourse);
router.route("/course").delete(verifyJWT, deleteCourse);
router.route("/enroll").post(verifyJWT, enrollInCourse);
router.route("/unenroll").post(verifyJWT, unenrollFromCourse);
router.route("/instructors").get(verifyJWT, getInstructor);
router.route("/add-review").post(verifyJWT, addReview);
router.route("/lessons").get(verifyJWT, getLessons);
router.route("/lessons").put(verifyJWT, upload.fields([{ name: "content", maxCount: 1 }]), updateLesson);
router.route("/lessons").delete(verifyJWT, deleteLesson);


export default router;
