import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || "smtp.example.com",
  port: parseInt(process.env.EMAIL_PORT || "587"),
  secure: false, // use TLS
  auth: {
    user: process.env.EMAIL_USER || "user@example.com",
    pass: process.env.EMAIL_PASS || "password",
  },
});

export async function sendEmail(email, subject, message) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM || "no-reply@example.com",
    to: email,
    subject,
    text: message,
    html: `<p>${message}</p>`,
  });
}
