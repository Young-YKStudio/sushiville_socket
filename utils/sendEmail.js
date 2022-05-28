const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  auth: {
    user: 'sushivilledev@gmail.com',
    pass: "symujamjljfakyiz"
  },
});

const sendEmail = (options) => {

  const mailOptions = {
    from: 'Sushiville <service@sushivilleny.com>',
    to: options.to,
    subject: options.subject,
    html: options.text
  }

  try {
    transporter.sendMail(mailOptions).then(console.info).catch(console.catch)
  } catch (err) {
    console.log(err)
  }
}

module.exports = sendEmail;