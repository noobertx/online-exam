const express = require('express');
const router = express.Router();
const authUser = require("../../services/auth-user.services");

router.post('/signup',authUser.signup)
router.post('/login',authUser.login)

router.post('/forgotPassword',authUser.forgotPassword)
router.patch('/resetPassword/:token',authUser.resetPassword)

module.exports = router;