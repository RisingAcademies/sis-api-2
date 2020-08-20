import express from 'express';

import * as userController from '../controllers/user/user.controller';

const router = express.Router();

//= ===============================
// API routes
//= ===============================
router.get('/', userController.allUsers);

module.exports = router;
