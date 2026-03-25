import { Router } from 'express';
import {
  startChat,
  getChats,
  getChat,
  renameChat,
  removeChat,
  sendMessage,
} from '../controllers/chat.controller';
import { protect } from '../middleware/auth.middleware';
import { streamAIResponse } from '../services/ai.service';

const router = Router();

router.use(protect);

router.post('/', startChat);
router.get('/', getChats);

// ← explain-code MUST be before /:chatId routes
router.post('/explain-code', async (req, res) => {
  try {
    const { code, language } = req.body;
    if (!code) return res.status(400).json({ message: 'Code is required' });

    const messages = [
      {
        role: 'system' as const,
        content: `You are CodeSphere AI, a senior software engineer. 
                  Explain code clearly — what it does, how it works, 
                  any patterns used, and potential improvements.`,
      },
      {
        role: 'user' as const,
        content: `Explain this ${language} code:\n\n${code}`,
      },
    ];

    await streamAIResponse(messages, res);
  } catch (error: any) {
    if (!res.headersSent)
      return res.status(500).json({ message: error.message });
  }
});

router.get('/:chatId', getChat);
router.patch('/:chatId', renameChat);
router.delete('/:chatId', removeChat);
router.post('/:chatId/message', sendMessage);

export default router;