import nodemailer from "nodemailer";

const sendMail = (mailId, name, sponserid, transactionPassword, password) => {
  const recipient = mailId;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "shyamkumarbeypore@gmail.com",
      pass: "beha ywht lrdo ichp",
    },
  });
  const mailOptions = {
    from: `MARKET JOURNEY GROUP <shyamkumarbeypore@gmail.com>`,
    to: `${recipient}`,
    subject: `Hi ${name}, Registration successful.`,
    text: `Hi ${name}, Welcome to MARKET JOURNEY`,
    html: `<h4>Congrats! You have joined the MARKET JOURNEY Group.</h4><p>Your sponserID is <strong>${sponserid}</strong><br/>Username: ${recipient}<br />Transaction Password: ${transactionPassword}<br />Password: ${password}</p>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email has been sent:-", info.response);
    }
  });
};

export default sendMail;
