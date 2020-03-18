const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const authUser = require("../../services/auth-user.services");
const Result = require("../../services/result.services");
// const {getAllQuiz,getQuizById,deleteQuiz} = require("../../services/Quiz.services");

const Quiz = require("../../services/Quiz.services");

const resultRouter = require("../../routes/api/result");


router.use("/:quizId/result",resultRouter)


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

router.route('/:quizId/result').post(authUser.protect,Result.createResult)

module.exports = router;