const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, 
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD
  }
});

async function sendNewPassword(email, newPassword) {
  const mailOptions = {
    from: 'express_mysql_template',
    to: email, 
    subject: "Your new password", 
    text: "Your new password: " + newPassword, 
    html: `<h3>Your new password: </h3><b>${newPassword}</b>`
  }
  return transporter.sendMail(mailOptions);
}

module.exports = { sendNewPassword };