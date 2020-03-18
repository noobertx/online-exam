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
	resultService.createResult
)


router.route("/:id").delete(resultService.deleteResult)
module.exports = router;