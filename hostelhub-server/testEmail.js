require("dotenv").config();
const nodemailer = require("nodemailer");

async function test() {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"HostelHub Test" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "SMTP Test",
      text: "If you receive this, Nodemailer is working.",
    });

    console.log("✅ Email sent:", info.response);
  } catch (err) {
    console.error("❌ Error:", err);
  }
}

test();