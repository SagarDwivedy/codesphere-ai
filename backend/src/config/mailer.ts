import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (
  to: string,
  otp: string,
  name: string
): Promise<void> => {
  await transporter.sendMail({
    from: `"CodeSphere AI" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Your CodeSphere AI verification code',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px;">
        <div style="text-align: center; margin-bottom: 24px;">
          <div style="width: 48px; height: 48px; background: #4f46e5; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center;">
            <span style="color: white; font-size: 20px; font-weight: bold;">C</span>
          </div>
          <h2 style="color: #111; margin-top: 12px;">CodeSphere AI</h2>
        </div>

        <p style="color: #444; font-size: 15px;">Hi ${name},</p>
        <p style="color: #444; font-size: 15px;">Your verification code is:</p>

        <div style="text-align: center; margin: 28px 0;">
          <div style="display: inline-block; background: #f1f3f5; border-radius: 12px; padding: 20px 40px;">
            <span style="font-size: 36px; font-weight: bold; letter-spacing: 12px; color: #4f46e5;">${otp}</span>
          </div>
        </div>

        <p style="color: #888; font-size: 13px; text-align: center;">
          This code expires in <strong>10 minutes</strong>.<br/>
          If you didn't request this, ignore this email.
        </p>
      </div>
    `,
  });
};