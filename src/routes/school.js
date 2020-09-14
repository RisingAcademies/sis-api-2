import express from 'express';
import validate from 'express-validation';

import * as schoolController from '../controllers/school/school.controller';
import * as schoolValidator from '../controllers/school/school.validator';
import isLoggedin from '../middleware/isLoggedin';

const router = express.Router();

//= ===============================
// API routes
//= ===============================

router.get(
	'/:schoolId/students/:page',
	isLoggedin,
	validate(schoolValidator.StudentBySchoolId),
	schoolController.getStudsBySchlId,
);

router.get(
	'/:schoolId/students/details/:id',
	isLoggedin,
	validate(schoolValidator.StudentDetailsBySchoolId),
	schoolController.getStudsDetailsBySchlId,
);

module.exports = router;
