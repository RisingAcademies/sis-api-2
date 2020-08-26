import express from 'express';
import validate from 'express-validation';

import * as schoolController from '../controllers/school/school.controller';
import * as schoolValidator from '../controllers/school/school.validator';
import isLoggedin from '../middleware/isLoggedin';

const router = express.Router();

//= ===============================
// API routes
//= ===============================
router.get('/:page', isLoggedin, schoolController.getSchools);
router.get(
	'/:id/students/:page',
	validate(schoolValidator.StudentBySchoolId),
	schoolController.getStudsBySchlId,
);

module.exports = router;
