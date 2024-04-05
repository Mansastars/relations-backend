import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: `${process.env.GMAIL_USER}`,
    pass: `${process.env.GMAIL_PASSWORD}`,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

export const SendEmailVerification = async (to: string, token: string) => {
  try {
    const response = await transport.sendMail({
      from: `${process.env.GMAIL_USER}`,
      to,
      subject: "PLEASE VERIFY YOUR ACCOUNT",
      html: `<div style="max-width: 600px; margin: 0 auto; text-align: center; padding: 25px; border: 2px solid #00CED1; border-radius: 5px;">
      <img src="https://assets-global.website-files.com/656a05e80b02929dac61def9/656c9f5f7a03960364b37e73_Screenshot_2023-02-12_at_22.15.46-removebg-preview%20(1)-p-500.png" alt="Mansastars" style="height: 100px; width: 100px; margin-bottom: 20px;">
      <h1 style="margin-bottom: 20px;">Welcome to Mansastars</h1>
      <p style="margin-bottom: 20px;">Click the button below to verify your account</p>
      <a href="https://${process.env.DOMAIN}/verify/${token}" style="display: inline-block; padding: 10px 20px; border-radius: 10px; background-color: #00CED1; color: #fff; text-decoration: none;">Verify Account</a>
  </div>`,
    });
  } catch (err: any) {
    console.log(err.message);
  }
};

export const ResetPaaswordMail = async (to: string, token: string) => {
    try {
      const response = await transport.sendMail({
        from: `${process.env.GMAIL_USER}`,
        to,
        subject: "PLEASE VERIFY YOUR ACCOUNT",
        html: `
        <div width="50%" style="text-align: center; padding: 25px; border-radius: 5px; border: 2px solid #00CED1;">
        <img src="https://assets-global.website-files.com/656a05e80b02929dac61def9/656c9f5f7a03960364b37e73_Screenshot_2023-02-12_at_22.15.46-removebg-preview%20(1)-p-500.png" alt="Mansastars" height="100px" width="100px">
        <h1>Welcome to Mansastars</h1>
        <p style="margin-bottom: 10px">Click the button below to reset your password</p>
        <br />
        <a href="https://${process.env.DOMAIN}/reset-password/${token}" type="button" style="text-align: center; padding: 10px; border-radius: 10px; background: #00CED1; text-decoration: none; color: white;">Reset Password</a>
        <br />
        </div>
        `,});
    } catch (err: any) {
      console.log(err.message);
    }
  };
