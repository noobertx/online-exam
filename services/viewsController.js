exports.getSignUpForm = (req,res) => {
    res.status(200).render('templates/sign-up',{
		title:'Please log into your account'
	});
}
exports.getLoginForm = (req,res) => {
    res.status(200).render('templates/login',{
		title:'Please log into your account'
	});
}
exports.getProfilePage = (req,res) => {
    res.status(200).render('templates/profile',{
		title:'Profile Page'
	});
}