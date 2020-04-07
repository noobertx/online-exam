const express = require('express');
const viewsController = require('../services/viewsController');
const authController = require('../services/auth-user.services');

const router = express.Router();
router.get('/sign-up',viewsController.getLoginForm);
router.get('/login',viewsController.getLoginForm);
router.get('/profile',authController.protect ,viewsController.getProfilePage);

module.exports = router;