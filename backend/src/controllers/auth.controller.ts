import { Request, Response } from 'express';
import {
  registerUser,
  loginUser,
  verifyOTP,
} from '../services/auth.service';

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: 'All fields are required' });

    await registerUser(name, email, password);

    return res.status(201).json({
      message: 'OTP sent to your email. Please verify to continue.',
      email,
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const verify = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp)
      return res.status(400).json({ message: 'Email and OTP are required' });

    const { user, token } = await verifyOTP(email, otp);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: 'Email verified successfully',
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: 'All fields are required' });

    const { user, token } = await loginUser(email, password);

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: 'Login successful',
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('token');
  return res.status(200).json({ message: 'Logged out successfully' });
};