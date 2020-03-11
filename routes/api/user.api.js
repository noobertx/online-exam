const express = require('express');
const router = express.Router();
const authUser = require("../../services/auth-user.services");

router.get('/',authUser.getAllUsers)
router.post('/signup',authUser.signup)
router.post('/login',authUser.login)

router.post('/forgotPassword',authUser.forgotPassword)
router.patch('/resetPassword/:token',authUser.resetPassword)
router.patch('/updateMyPassword',authUser.protect,authUser.updatePassword)
router.patch('/updateMe',authUser.protect,authUser.updateMe)
router.delete('/deleteMe',authUser.protect,authUser.deleteMe)

module.exports = router;