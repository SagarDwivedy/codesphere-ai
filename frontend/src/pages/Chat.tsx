import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useChat } from '../hooks/useChat';
import ChatSidebar from '../components/chat/ChatSidebar';
import MessageBubble from '../components/chat/MessageBubble';
import TypingIndicator from '../components/chat/TypingIndicator';
import ChatInput from '../components/chat/ChatInput';
import type { Chat as IChat } from '../types';

const CATEGORIES = ['general', 'dsa', 'code', 'system-design'];

export default function Chat() {
  const navigate = useNavigate();
  const [activeChat, setActiveChat] = useState<IChat | null>(null);
  const [showNewChat, setShowNewChat] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const bottomRef = useRef<HTMLDivElement>(null);
  const { messages, isStreaming, streamingContent, sendMessage, loadMessages, clearMessages } = useChat();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingContent]);

  const handleSelectChat = async (chat: IChat) => {
    setActiveChat(chat);
    setShowNewChat(false);
    await loadMessages(chat._id);
  };

  const handleNewChat = () => {
    setActiveChat(null);
    setShowNewChat(true);
    clearMessages();
  };

  const handleCreateAndSend = async (message: string) => {
    try {
      const { data } = await api.post('/chats', { category: selectedCategory });
      const newChat = data.chat;
      setActiveChat(newChat);
      setShowNewChat(false);
      await sendMessage(newChat._id, message);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSend = async (message: string) => {
    if (!activeChat) {
      await handleCreateAndSend(message);
    } else {
      await sendMessage(activeChat._id, message);
    }
  };

  return (
    <div className="flex h-screen bg-white dark:bg-dark-primary overflow-hidden">
      <ChatSidebar
        activeChatId={activeChat?._id || null}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
      />

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* Header */}
        <div className="h-12 border-b border-gray-100 dark:border-dark-border flex items-center justify-between px-6 flex-shrink-0">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {activeChat ? activeChat.title : 'New Chat'}
          </span>
          {activeChat && (
            <span className="text-xs px-2 py-0.5 bg-brand-50 text-brand-600 rounded-full font-medium capitalize">
              {activeChat.category}
            </span>
          )}
          {/* Nav to DSA */}
          <button
            onClick={() => navigate('/dsa')}
            className="btn-ghost text-xs py-1.5"
          >
            DSA Explorer →
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
          {/* New chat — category selector */}
          {showNewChat && messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-6 animate-fade-in">
              <div className="text-center">
                <div className="w-12 h-12 bg-brand-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-xl font-bold">C</span>
                </div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  What are we working on?
                </h2>
                <p className="text-sm text-gray-500 mt-1">Choose a category to get started</p>
              </div>
              <div className="flex gap-2 flex-wrap justify-center">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                      selectedCategory === cat
                        ? 'bg-brand-600 text-white'
                        : 'bg-surface-secondary dark:bg-dark-tertiary text-gray-600 dark:text-gray-400 hover:bg-surface-tertiary'
                    }`}
                  >
                    {cat === 'dsa' ? 'DSA' : cat.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Empty state — no chat selected */}
          {!showNewChat && !activeChat && (
            <div className="flex flex-col items-center justify-center h-full gap-4 animate-fade-in">
              <div className="w-12 h-12 bg-brand-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl font-bold">C</span>
              </div>
              <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  CodeSphere AI
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Start a new chat or select one from the sidebar
                </p>
              </div>
              <button onClick={handleNewChat} className="btn-primary">
                + New Chat
              </button>
            </div>
          )}

          {/* Messages */}
          {messages.map((msg, i) => (
            <MessageBubble key={i} message={msg} />
          ))}

          {/* Streaming */}
          {isStreaming && <TypingIndicator content={streamingContent} />}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <ChatInput onSend={handleSend} disabled={isStreaming} />
      </div>
    </div>
  );
}