import express from 'express';
// import validate from "express-validation";

import * as studentController from '../controllers/student/student.controller';
// import * as studentValidator from "../controllers/student/student.validator";
// import isLoggedin from "../middleware/isLoggedin";

const router = express.Router();

//= ===============================
// API routes
//= ===============================
router.get('/:id', studentController.getStudentById);

module.exports = router;
