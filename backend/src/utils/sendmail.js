import nodemailer from "nodemailer";
import { ApiError } from "./ApiError.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import fs from "fs";
import path from "path";

const templatePath = path.join(
  process.cwd(),
  "src",
  "utils",
  "email_template.html"
); // Ensure correct path to your HTML file
const emailTemplate = fs.readFileSync(templatePath, "utf-8");

export const sendEmail = async ({ email, emailType, userId }) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);
    const user = await User.findById(userId);
    const userName = await user.username;
    let courseName = "No Course";
    let courseId = "No Course";
    if(user.courses.length > 0){
       courseName = await user.courses[user.courses.length - 1].title;
       courseId = await user.courses[user.courses.length - 1]._id;
    }
    

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        },
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          passwordChnageToken: hashedToken,
          passwordChnageTokenExpiry: Date.now() + 3600000,
        },
      });
    }

    let transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "43c744d647ce2e",
        pass: "5fd2ce917fe2a5",
      },
    });
    const mailOptions = {
      from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
      to: email,
      subject:
        emailType === "VERIFY"
          ? "Verify Your Account"
          : emailType === "PASSWORD_RESET"
          ? "Reset Your Password"
          : "Course Enrollment Successful",
      html: emailTemplate
        .replace(
          "{{HEADER_TITLE}}",
          emailType === "VERIFY"
            ? "Verify Your Email"
            : emailType === "PASSWORD_RESET"
            ? "Reset Your Password"
            : "Enrollment Successful"
        )
        .replace("{{GREETING}}", `Hi ${userName},`) // Replace with the user's name or a default greeting
        .replace(
          "{{MESSAGE}}",
          emailType === "VERIFY"
            ? "Please verify your email address by clicking the button below."
            : emailType === "PASSWORD_RESET"
            ? "Click the button below to reset your password."
            : `You have successfully enrolled in the course: ${courseName}.`
        )
        .replace(
          "{{ACTION_URL}}",
          emailType === "VERIFY"
            ? `${process.env.DOMAIN}/verify-email?token=${hashedToken}`
            : emailType === "PASSWORD_RESET"
            ? `${process.env.DOMAIN}/change-password`
            : `${process.env.DOMAIN}/courses/${courseId}`
        ) // Replace with the appropriate URL
        .replace(
          "{{BUTTON_TEXT}}",
          emailType === "VERIFY"
            ? "Verify Email"
            : emailType === "PASSWORD_RESET"
            ? "Reset Password"
            : "View Course"
        ),
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    throw new ApiError(400, error.message);
  }
};
