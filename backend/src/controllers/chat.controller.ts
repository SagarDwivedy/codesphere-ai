import { Request, Response } from 'express';
import {
  createChat,
  getUserChats,
  getChatById,
  deleteChat,
  updateChatTitle,
} from '../services/chat.service';
import { ChatCategory } from '../models/chat.model';

export const startChat = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { category } = req.body;
    const chat = await createChat(userId, category as ChatCategory);
    return res.status(201).json({ chat });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getChats = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const chats = await getUserChats(userId);
    return res.status(200).json({ chats });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getChat = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const chatId = req.params.chatId as string;
    const chat = await getChatById(chatId, userId);
    if (!chat) return res.status(404).json({ message: 'Chat not found' });
    return res.status(200).json({ chat });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const renameChat = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const chatId = req.params.chatId as string;
    const { title } = req.body;
    const chat = await updateChatTitle(chatId, userId, title);
    if (!chat) return res.status(404).json({ message: 'Chat not found' });
    return res.status(200).json({ chat });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const removeChat = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const chatId = req.params.chatId as string;
    const deleted = await deleteChat(chatId, userId);
    if (!deleted) return res.status(404).json({ message: 'Chat not found' });
    return res.status(200).json({ message: 'Chat deleted' });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
import { streamAIResponse, buildSystemPrompt } from '../services/ai.service';
import { addMessage, getChatHistory } from '../services/chat.service';

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const chatId = req.params.chatId as string;
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    // 1. Get the chat to find its category
    const chat = await getChatById(chatId, userId);
    if (!chat) return res.status(404).json({ message: 'Chat not found' });

    // 2. Save user message to DB
    await addMessage(chatId, 'user', message);

    // 3. Build message history for OpenAI
    const history = await getChatHistory(chatId, userId);

    // 4. Build full messages array with system prompt
    const messages = [
      { role: 'system' as const, content: buildSystemPrompt(chat.category) },
      ...history,
    ];

    // 5. Stream AI response back to client
    const aiResponse = await streamAIResponse(messages, res);

    // 6. Save AI response to DB after streaming completes
    await addMessage(chatId, 'assistant', aiResponse);

  } catch (error: any) {
    // Only send error if headers not sent yet
    if (!res.headersSent) {
      return res.status(500).json({ message: error.message });
    }
  }
};