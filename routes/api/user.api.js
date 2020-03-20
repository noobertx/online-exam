const express = require('express');
const router = express.Router();
const authUser = require("../../services/auth-user.services");


router.get("/me",authUser.protect,authUser.getMe,authUser.getUser)

router.get('/',authUser.getAllUsers)
router.post('/signup',authUser.signup)
router.post('/login',authUser.login)

router.use(authUser.protect);

router.post('/forgotPassword',authUser.forgotPassword)
router.patch('/resetPassword/:token',authUser.resetPassword)
router.patch('/updateMyPassword',authUser.updatePassword)
router.patch('/updateMe',authUser.updateMe)
router.delete('/deleteMe',authUser.deleteMe)


router.route("/:id")
.patch(authUser.updateUser)
.delete(authUser.restrictTo("admin"),authUser.deleteUser)

module.exports = router;