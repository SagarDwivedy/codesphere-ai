import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen bg-white dark:bg-dark-primary">
      {/* Nav */}
      <nav className="border-b border-gray-100 dark:border-dark-border px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">C</span>
          </div>
          <span className="font-semibold text-gray-900 dark:text-white">CodeSphere AI</span>
        </div>
        <div className="flex gap-3">
          {isAuthenticated ? (
            <button onClick={() => navigate('/chat')} className="btn-primary text-sm">
              Open App
            </button>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="btn-ghost text-sm">
                Sign in
              </button>
              <button onClick={() => navigate('/register')} className="btn-primary text-sm">
                Get started
              </button>
            </>
          )}
        </div>
      </nav>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-brand-50 dark:bg-brand-900/20 text-brand-600 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
          ✨ AI-powered coding assistant
        </div>

        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
          Master DSA with
          <span className="text-brand-600"> AI guidance</span>
        </h1>

        <p className="text-lg text-gray-500 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          Chat with AI, explore 150+ DSA problems, get instant code explanations,
          and track your progress — all in one place.
        </p>

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate('/register')}
            className="btn-primary px-8 py-3 text-base"
          >
            Start for free
          </button>
          <button
            onClick={() => navigate('/dsa')}
            className="btn-ghost px-8 py-3 text-base border border-gray-200 dark:border-dark-border"
          >
            Browse problems
          </button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-6 mt-20">
          {[
            { icon: '💬', title: 'AI Chat', desc: 'Stream responses from Llama 3 with context-aware conversations' },
            { icon: '📚', title: 'DSA Explorer', desc: '150+ problems with solutions, filters and AI explanations' },
            { icon: '💡', title: 'Code Explainer', desc: 'Paste any code and get a detailed line-by-line breakdown' },
          ].map((f) => (
            <div key={f.title} className="card p-6 text-left">
              <span className="text-2xl mb-3 block">{f.icon}</span>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">{f.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}