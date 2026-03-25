import { useState, useRef } from 'react';
import api from '../api/axios';
import type { Message } from '../types';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState('');
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = async (chatId: string, content: string) => {
    // Add user message immediately
    const userMessage: Message = {
      role: 'user',
      content,
      createdAt: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsStreaming(true);
    setStreamingContent('');

    try {
      const token = localStorage.getItem('token');
      abortRef.current = new AbortController();

      const response = await fetch(
        `http://localhost:5000/api/chats/${chatId}/message`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ message: content }),
          signal: abortRef.current.signal,
        }
      );

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let fullContent = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ') && line !== 'data: [DONE]') {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.chunk) {
                fullContent += data.chunk;
                setStreamingContent(fullContent);
              }
            } catch {}
          }
        }
      }

      // Add complete AI message
      const aiMessage: Message = {
        role: 'assistant',
        content: fullContent,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setStreamingContent('');
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        console.error('Stream error:', error);
      }
    } finally {
      setIsStreaming(false);
    }
  };

  const loadMessages = async (chatId: string) => {
    const { data } = await api.get(`/chats/${chatId}`);
    setMessages(data.chat.messages);
  };

  const clearMessages = () => setMessages([]);

  return {
    messages,
    isStreaming,
    streamingContent,
    sendMessage,
    loadMessages,
    clearMessages,
  };
};