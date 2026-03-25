import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-surface-secondary dark:bg-dark-primary flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl font-bold text-brand-600 mb-4">404</div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Page not found
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          The page you're looking for doesn't exist.
        </p>
        <button onClick={() => navigate('/chat')} className="btn-primary">
          Back to Chat
        </button>
      </div>
    </div>
  );
}