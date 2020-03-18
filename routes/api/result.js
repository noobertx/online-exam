const express = require("express");
const catchAsync = require("./../../services/catchAsync.service");
const resultService = require("./../../services/result.services");
const authUser = require("../../services/auth-user.services");

const router = express.Router({
	mergeParams:true
});

router
.route("/")
.get(
	authUser.protect,
	resultService.getAllResults
)
.post(
	authUser.protect,
	resultService.setUserQuizId,
	resultService.createResult
)

router.route("/:id").patch(
	authUser.protect,
	resultService.updateResult
).delete(
	authUser.protect,
	authUser.restrictTo("admin"),
	resultService.deleteResult
)
module.exports = router;