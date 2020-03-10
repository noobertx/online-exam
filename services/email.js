const nodemailer = require('nodemailer');
const sendEmail = async  options => {
	// create transporter

	const s_options = {
		host:process.env.EMAIL_HOST,
		port:process.env.EMAIL_PORT,
		secure: true,
		auth:{
			user:process.env.EMAIL_USERNAME,
			password:process.env.EMAIL_PASSWORD,
		}
	}

	const transporter = nodemailer.createTransport(s_options)

	// define email options
	const mailOptions = {
		from:'Dev Noobertx <noobertx@gmail.com>',
		to:options.email,
		subject:options.subject,
		text:options.message
	}

	// send the email with nodemailer
	console.log(mailOptions);

	await transporter.sendMail(mailOptions,(error,info)=>{
		if (error) {
            return console.log(error,info);
        }
        console.log('Message sent: %s', info.messageId);
	});
}


module.exports = sendEmail
