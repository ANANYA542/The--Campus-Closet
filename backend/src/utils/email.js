import { Resend } from "resend";
import dotenv from "dotenv";
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to, subject, html) => {
  try {
    const data = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });
    console.log("Email sent:", data);
    return true;
  } catch (error) {
    console.error("Email error:", error);
    return false;
  }
};
