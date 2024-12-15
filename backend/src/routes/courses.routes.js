import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware";
import { instructorOnly } from "../middleware/admin.middleware";
import { addCourses,  } from "../controllers/user.controller";
import { upload } from "../middleware/multer.middleware";

const router = Router();


router
  .route("/courses-add")
  .post(
    verifyJWT,
    instructorOnly,
    upload.fields([{ name: "content", maxCount: 1 }]),
    addCourses
  );
