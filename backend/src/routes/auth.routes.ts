import { Router } from 'express';
import { register, login, logout, verify } from '../controllers/auth.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/verify-otp', verify);
router.post('/login', login);
router.post('/logout', logout);

router.get('/me', protect, (req, res) => {
  res.json({ message: 'Authenticated', userId: req.user?.id });
});


export default router;