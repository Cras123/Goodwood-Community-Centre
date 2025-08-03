// lib/sendEmail.ts
import nodemailer from "nodemailer";

export async function sendEmail(
  to: string | string[],
  subject: string,
  html: string
) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to,
    subject,
    text: html.replace(/<[^>]+>/g, ""), // simple plaintext fallback
    html,
  });
}
