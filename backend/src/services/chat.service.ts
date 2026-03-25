import Chat, { IChat, ChatCategory } from '../models/chat.model';

// Create a new chat session
export const createChat = async (
  userId: string,
  category: ChatCategory = 'general'
): Promise<IChat> => {
  const chat = await Chat.create({ userId, category });
  return chat;
};

// Add a message to existing chat
export const addMessage = async (
  chatId: string,
  role: 'user' | 'assistant',
  content: string
): Promise<IChat | null> => {
  const chat = await Chat.findByIdAndUpdate(
    chatId,
    { $push: { messages: { role, content } } },
    { returnDocument: 'after' }
  );
  return chat;
};

// Get all chats for a user (sidebar list)
export const getUserChats = async (userId: string): Promise<IChat[]> => {
  return Chat.find({ userId })
    .select('title category createdAt updatedAt')
    .sort({ updatedAt: -1 });
};

// Get a single chat with all messages
export const getChatById = async (
  chatId: string,
  userId: string
): Promise<IChat | null> => {
  return Chat.findOne({ _id: chatId, userId });
};

// Update chat title
export const updateChatTitle = async (
  chatId: string,
  userId: string,
  title: string
): Promise<IChat | null> => {
  return Chat.findOneAndUpdate(
    { _id: chatId, userId },
    { title },
    { returnDocument: 'after' }
  );
};

// Delete a chat
export const deleteChat = async (
  chatId: string,
  userId: string
): Promise<boolean> => {
  const result = await Chat.findOneAndDelete({ _id: chatId, userId });
  return !!result;
};
// Get chat history formatted for OpenAI
export const getChatHistory = async (
  chatId: string,
  userId: string
): Promise<{ role: 'user' | 'assistant'; content: string }[]> => {
  const chat = await Chat.findOne({ _id: chatId, userId });
  if (!chat) return [];

  // Only send last 10 messages to control token usage
  const recentMessages = chat.messages.slice(-10);

  return recentMessages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));
};