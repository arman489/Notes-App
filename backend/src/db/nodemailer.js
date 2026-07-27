import nodemailer from 'nodemailer'
import dotenv from "dotenv";

dotenv.config();

// const transpoter = nodemailer.createTransport({
//     host:"smtp-relay.brevo.com",
//     port:587,
//     secure:false,
//     auth:{
//         user:process.env.SMTP_USER,
//         pass:process.env.SMTP_PASS
//     }

// })

// export default transpoter
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

transporter.verify((err, success) => {
  if (err) {
    console.error("VERIFY ERROR:", err);
  } else {
    console.log("SMTP Ready");
  }
});

export default transporter;