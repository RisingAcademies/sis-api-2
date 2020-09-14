import express from 'express';
import validate from 'express-validation';

import * as userController from '../controllers/user/user.controller';
import * as userValidator from '../controllers/user/user.validator';
import isLoggedin from '../middleware/isLoggedin';

const router = express.Router();

//= ===============================
// API routes
//= ===============================
router.get('/', isLoggedin, userController.allUsers);

router.post('/login', validate(userValidator.login), userController.login);

module.exports = router;
