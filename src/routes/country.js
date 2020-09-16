import express from 'express';

import * as countryController from '../controllers/country/country.controller';
import isLoggedin from '../middleware/isLoggedin';

const router = express.Router();

//= ===============================
// API routes
//= ===============================
router.get(
	'/:countryId/school/:page',
	isLoggedin,
	countryController.getSchools,
);
router.get('/:countryId/grade', isLoggedin, countryController.getCountryGrades);

router.get('/', isLoggedin, countryController.getAllCountries);

module.exports = router;
