import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.routes';
import chatRoutes from './routes/chat.routes';
import dsaRoutes from './routes/dsa.routes';
import bookmarkRoutes from './routes/bookmark.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();

// General rate limit — 100 requests per 15 min
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Too many requests, please try again later' },
});

// Strict limit for AI routes — 20 per 15 min
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: { message: 'AI request limit reached, please wait' },
});

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  'http://localhost:5173',
  'https://codesphere-6azu4iuc2-sagardwivedys-projects.vercel.app',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chats', aiLimiter, chatRoutes);
app.use('/api/dsa', dsaRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'CodeSphere API is running' });
});

// Global error handler — must be last
app.use(errorHandler);

export default app;