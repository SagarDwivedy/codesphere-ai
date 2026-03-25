import type { Message } from '../../types';

interface Props {
  message: Message;
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === 'user';

  return (
    <div className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in`}>
      {/* AI Avatar */}
      {!isUser && (
        <div className="w-7 h-7 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
          <span className="text-brand-600 text-xs font-semibold">C</span>
        </div>
      )}

      {/* Bubble */}
      <div
        className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'bg-brand-600 text-white rounded-br-sm'
            : 'bg-surface-secondary dark:bg-dark-tertiary text-gray-800 dark:text-gray-100 border border-gray-100 dark:border-dark-border rounded-bl-sm'
        }`}
      >
        <pre className="whitespace-pre-wrap font-sans">{message.content}</pre>
      </div>
    </div>
  );
}