const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const authUser = require("../../services/auth-user.services");
// const {getAllQuiz,getQuizById,deleteQuiz} = require("../../services/Quiz.services");

const Quiz = require("../../services/Quiz.services");
router.route("/")
.get(authUser.protect,Quiz.getAllQuiz)
.post(
	upload.none(),
	Quiz.createQuiz
)

router.route("/:id")
.get(authUser.protect,Quiz.getQuizById)
.put(authUser.protect,Quiz.updateQuizById)
.delete(
	authUser.protect,
	authUser.restrictTo("admin"),
	upload.none(),
	Quiz.deleteQuiz
)

module.exports = router;