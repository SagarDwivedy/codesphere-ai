import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { useAuthStore } from '../../store/authStore';
import type { Chat } from '../../types';

interface Props {
  activeChatId: string | null;
  onSelectChat: (chat: Chat) => void;
  onNewChat: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  general: 'bg-gray-100 text-gray-600 dark:bg-dark-border dark:text-gray-400',
  dsa: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
  code: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
  'system-design': 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
};

export default function ChatSidebar({ activeChatId, onSelectChat, onNewChat }: Props) {
  const { user, clearAuth } = useAuthStore();
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    fetchChats();
  }, [activeChatId]);

  const fetchChats = async () => {
    try {
      const { data } = await api.get('/chats');
      setChats(data.chats);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await api.post('/auth/logout');
    clearAuth();
    window.location.href = '/login';
  };
  const handleDeleteChat = async (chatId: string) => {
  try {
    await api.delete(`/chats/${chatId}`);
    setChats((prev) => prev.filter((c) => c._id !== chatId));
    if (activeChatId === chatId) {
      onNewChat();
    }
  } catch (err) {
    console.error(err);
  }
};

  const groupByDate = (chats: Chat[]) => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    return {
      Today: chats.filter((c) => new Date(c.updatedAt).toDateString() === today),
      Yesterday: chats.filter((c) => new Date(c.updatedAt).toDateString() === yesterday),
      Older: chats.filter(
        (c) =>
          new Date(c.updatedAt).toDateString() !== today &&
          new Date(c.updatedAt).toDateString() !== yesterday
      ),
    };
  };

  const grouped = groupByDate(chats);

  return (
    <div className="w-56 flex flex-col bg-surface-secondary dark:bg-dark-secondary border-r border-gray-100 dark:border-dark-border h-full flex-shrink-0">
      {/* Logo */}
      <div className="p-4 border-b border-gray-100 dark:border-dark-border flex items-center gap-2">
        <div className="w-6 h-6 bg-brand-600 rounded-md flex items-center justify-center">
          <span className="text-white text-xs font-semibold">C</span>
        </div>
        <span className="text-sm font-semibold text-gray-900 dark:text-white">CodeSphere AI</span>
      </div>

      {/* New Chat */}
      <div className="p-3">
        <button onClick={onNewChat} className="btn-primary w-full text-xs py-2">
          + New Chat
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-2 space-y-4 pb-4">
        {Object.entries(grouped).map(([group, groupChats]) =>
          groupChats.length > 0 ? (
            <div key={group}>
              <p className="text-xs font-medium text-gray-400 dark:text-gray-500 px-2 mb-1 uppercase tracking-wide">
                {group}
              </p>
              {groupChats.map((chat) => (
  <div
    key={chat._id}
    className={`group relative flex items-center rounded-lg mb-0.5 transition-colors ${
      activeChatId === chat._id
        ? 'bg-brand-600 text-white'
        : 'hover:bg-surface-tertiary dark:hover:bg-dark-tertiary'
    }`}
  >
    <button
      onClick={() => onSelectChat(chat)}
      className="flex-1 text-left px-3 py-2 min-w-0"
    >
      <p className={`text-xs font-medium truncate ${
        activeChatId === chat._id
          ? 'text-white'
          : 'text-gray-700 dark:text-gray-300'
      }`}>
        {chat.title}
      </p>
      <span className={`text-xs px-1.5 py-0.5 rounded mt-0.5 inline-block ${
        activeChatId === chat._id
          ? 'bg-white/20 text-white'
          : CATEGORY_COLORS[chat.category] || CATEGORY_COLORS.general
      }`}>
        {chat.category}
      </span>
    </button>

    <button
      onClick={(e) => {
        e.stopPropagation();
        handleDeleteChat(chat._id);
      }}
      className={`opacity-0 group-hover:opacity-100 transition-opacity mr-2 p-1 rounded flex-shrink-0 ${
        activeChatId === chat._id
          ? 'text-white/70 hover:text-white'
          : 'text-gray-400 hover:text-red-500'
      }`}
      title="Delete chat"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"/>
        <path d="M19 6l-1 14H6L5 6"/>
        <path d="M10 11v6M14 11v6"/>
      </svg>
    </button>
  </div>
))}
            </div>
          ) : null
        )}
      </div>
      {/* Nav links */}
<div className="px-3 pb-2 space-y-1">
  <button
    onClick={() => window.location.href = '/dsa'}
    className="w-full text-left px-3 py-2 rounded-lg text-xs text-gray-600 dark:text-gray-400 hover:bg-surface-tertiary dark:hover:bg-dark-tertiary transition-colors"
  >
    📚 DSA Explorer
  </button>
  <button
    onClick={() => window.location.href = '/explain'}
    className="w-full text-left px-3 py-2 rounded-lg text-xs text-gray-600 dark:text-gray-400 hover:bg-surface-tertiary dark:hover:bg-dark-tertiary transition-colors"
  >
    💡 Code Explainer
  </button>
  <button
    onClick={() => window.location.href = '/bookmarks'}
    className="w-full text-left px-3 py-2 rounded-lg text-xs text-gray-600 dark:text-gray-400 hover:bg-surface-tertiary dark:hover:bg-dark-tertiary transition-colors"
  >
    ★ Bookmarks
  </button>
</div>

      {/* User */}
      <div className="p-3 border-t border-gray-100 dark:border-dark-border flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
          <span className="text-brand-600 text-xs font-semibold uppercase">
            {user?.name?.[0]}
          </span>
        </div>
        <span className="text-xs font-medium text-gray-700 dark:text-gray-300 flex-1 truncate">
          {user?.name}
        </span>
        <button
          onClick={handleLogout}
          title="Logout"
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors text-sm"
        >
          ↩
        </button>
      </div>
    </div>
  );
}