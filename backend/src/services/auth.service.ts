import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/user.model';
import { sendOTPEmail } from '../config/mailer';

// Generate 6-digit OTP
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<IUser> => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    // If user exists but not verified, resend OTP
    if (!existingUser.isVerified) {
      const otp = generateOTP();
      const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min
      existingUser.otp = otp;
      existingUser.otpExpiry = otpExpiry;
      await existingUser.save();
      //await sendOTPEmail(email, otp, existingUser.name);
      try {
      await sendOTPEmail(email, otp, name);
      } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue anyway — user can request resend
      }
      return existingUser;
    }
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const otp = generateOTP();
  const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    otp,
    otpExpiry,
    isVerified: false,
  });

  await sendOTPEmail(email, otp, name);
  return user;
};

export const verifyOTP = async (
  email: string,
  otp: string
): Promise<{ user: IUser; token: string }> => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('User not found');
  if (user.isVerified) throw new Error('User already verified');
  if (!user.otp || !user.otpExpiry) throw new Error('OTP not found');
  if (new Date() > user.otpExpiry) throw new Error('OTP has expired');
  if (user.otp !== otp) throw new Error('Invalid OTP');

  // Mark verified and clear OTP
  user.isVerified = true;
  user.otp = undefined;
  user.otpExpiry = undefined;
  await user.save();

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' }
  );

  return { user, token };
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{ user: IUser; token: string }> => {
  const user = await User.findOne({ email });
  if (!user) throw new Error('Invalid credentials');

  // Block unverified users
  if (!user.isVerified) {
    throw new Error('Please verify your email first');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET as string,
    { expiresIn: '7d' }
  );

  return { user, token };
};