import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CodeExplainer() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('javascript');

  const LANGUAGES = ['javascript', 'typescript', 'python', 'java', 'c++'];

  const handleExplain = async () => {
    if (!code.trim()) return;
    setIsLoading(true);
    setExplanation('');

    try {
      const token = localStorage.getItem('token');
      const BASE = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';
      const response = await fetch(`${BASE}/api/chats/explain-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ code, language }),
      });

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let full = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const text = decoder.decode(value);
        for (const line of text.split('\n')) {
          if (line.startsWith('data: ') && line !== 'data: [DONE]') {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.chunk) { full += data.chunk; setExplanation(full); }
            } catch {}
          }
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-secondary dark:bg-dark-primary p-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Code Explainer
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Paste any code and get an AI explanation
            </p>
          </div>
          <button onClick={() => navigate('/chat')} className="btn-ghost text-sm">
            ← Back to Chat
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">

          {/* Left — Code input */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Your code
              </span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-xs border border-gray-200 dark:border-dark-border rounded-lg px-2 py-1 bg-white dark:bg-dark-secondary text-gray-600 dark:text-gray-400"
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={`// Paste your ${language} code here...`}
              className="w-full h-80 p-4 bg-gray-900 text-green-400 font-mono text-sm rounded-xl resize-none outline-none leading-relaxed"
            />

            <button
              onClick={handleExplain}
              disabled={!code.trim() || isLoading}
              className="btn-primary w-full mt-3"
            >
              {isLoading ? 'Explaining...' : '✨ Explain this code'}
            </button>
          </div>

          {/* Right — Explanation */}
          <div className="card p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 bg-brand-600 rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">C</span>
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                AI Explanation
              </span>
            </div>

            <div className="h-80 overflow-y-auto">
              {explanation ? (
                <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 dark:text-gray-300 leading-relaxed animate-fade-in">
                  {explanation}
                </pre>
              ) : isLoading ? (
                <div className="flex flex-col gap-3 pt-2">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="h-3 bg-surface-tertiary dark:bg-dark-tertiary rounded animate-pulse"
                      style={{ width: `${60 + Math.random() * 35}%` }}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <span className="text-3xl mb-3">💡</span>
                  <p className="text-sm text-gray-500">
                    Paste code on the left and click explain
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}