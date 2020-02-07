const express = require('express');
const router = express.Router();
const authUser = require("../../services/auth-user.services");

router.post('/signup',authUser.signup)


module.exports = router;