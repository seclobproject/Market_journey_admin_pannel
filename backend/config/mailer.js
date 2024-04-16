import nodemailer from "nodemailer";

export const sendMail = (mailId, name, sponserid, password) => {
  const recipient = mailId;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "seclobclt@gmail.com",
      pass: "tplg bisd mapf emsb",
    },
  });
  const mailOptions = {
    from: `MARKET JOURNEY GROUP <seclobclt@gmail.com>`,
    to: `${recipient}`,
    subject: `Hi ${name}, Registration successful.`,
    text: `Hi ${name}, Welcome to MARKET JOURNEY`,
    html: `<h4>Congrats! You have joined the MARKET JOURNEY Group.</h4><p>Your sponserID is <strong>${sponserid}</strong><br/>Username: ${recipient}<br />Password: ${password}</p>`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email has been sent:-", info.response);
    }
  });
};





export const sendMailWithAttachment=async(user,recipient, pdfFilePath)=> {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: "seclobclt@gmail.com",
      pass: "tplg bisd mapf emsb",
    },
  });

  const mailOptions = {
    from: `MARKET JOURNEY GROUP <seclobclt@gmail.com>`,
    to: recipient,
    subject: `Payment Invoice`,
    text: `Hi, ${user.name} is successfully completed your payment. please find the attachment`,
    attachments: [
      {
        filename: 'Invoice.pdf',
        path: pdfFilePath,
      },
    ],
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email has been sent:", info.response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
}
