export default function TypingIndicator({ content }: { content: string }) {
  return (
    <div className="flex gap-3 justify-start animate-fade-in">
      <div className="w-7 h-7 bg-brand-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
        <span className="text-brand-600 text-xs font-semibold">C</span>
      </div>
      <div className="max-w-[75%] bg-surface-secondary dark:bg-dark-tertiary border border-gray-100 dark:border-dark-border rounded-2xl rounded-bl-sm px-4 py-2.5">
        {content ? (
          <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 dark:text-gray-100 leading-relaxed">
            {content}
          </pre>
        ) : (
          <div className="flex gap-1 items-center py-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse-dot"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}