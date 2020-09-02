import express from "express";
import validate from "express-validation";

import * as studentController from "../controllers/student/student.controller";
import * as studentValidator from "../controllers/student/student.validator";
import isLoggedin from "../middleware/isLoggedin";

const router = express.Router();

//= ===============================
// API routes
//= ===============================
router.get(
  "/export/:schoolId",
  isLoggedin,
  studentController.getExportStudents
);

router.get("/search", isLoggedin, studentController.getSearchStudents);

router.post(
  "/",
  isLoggedin,
  validate(studentValidator.addStudent),
  studentController.addStudent
);

router.put(
  "/",
  isLoggedin,
  validate(studentValidator.editStudent),
  studentController.editStudent
);

router.put("/register/:id", isLoggedin, studentController.registerStudent);

router.put("/unregister/:id", isLoggedin, studentController.unregisterStudent);

router.delete("/:id", isLoggedin, studentController.deleteStudent);

module.exports = router;
