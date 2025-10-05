import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import OtpEmailTemplate from "./OtpEmailTemplate";

export async function sendEmail(email, subject, message) {
  // ✅ FIX: await the render result
  const htmlTemplate = await render(<OtpEmailTemplate message={message} />);

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.example.com",
    port: parseInt(process.env.EMAIL_PORT || "587"),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER || "user@example.com",
      pass: process.env.EMAIL_PASS || "password",
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || "no-reply@example.com",
    to: email,
    subject,
    text: message,
    html: htmlTemplate, // ✅ Now a proper string
  });

  console.log(`✅ Email sent to ${email}`);
}
