import { useState, useRef } from 'react';

interface Props {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: Props) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (!value.trim() || disabled) return;
    onSend(value.trim());
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="p-4 border-t border-gray-100 dark:border-dark-border">
      <div className="flex gap-3 items-end border border-gray-200 dark:border-dark-border rounded-xl px-4 py-3 focus-within:border-brand-500 transition-colors">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          placeholder="Message CodeSphere AI..."
          disabled={disabled}
          rows={1}
          className="flex-1 resize-none bg-transparent outline-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 max-h-32 disabled:opacity-50"
        />
        <button
          onClick={handleSend}
          disabled={!value.trim() || disabled}
          className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center flex-shrink-0 hover:bg-brand-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5"/>
            <polyline points="5 12 12 5 19 12"/>
          </svg>
        </button>
      </div>
      <p className="text-center text-xs text-gray-400 mt-2">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  );
}