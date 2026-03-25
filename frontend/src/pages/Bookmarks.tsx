import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../api/axios';
import type { Bookmark } from '../types';

const DIFFICULTY_STYLES: Record<string, string> = {
  easy: 'bg-green-50 text-green-600',
  medium: 'bg-yellow-50 text-yellow-600',
  hard: 'bg-red-50 text-red-600',
};

export default function Bookmarks() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: async () => {
      const { data } = await api.get('/bookmarks');
      return data.bookmarks as Bookmark[];
    },
  });

  const removeMutation = useMutation({
    mutationFn: (problemId: string) => api.delete(`/bookmarks/${problemId}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['bookmarks'] }),
  });

  return (
    <div className="min-h-screen bg-surface-secondary dark:bg-dark-primary p-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Bookmarks
            </h1>
            <p className="text-sm text-gray-500 mt-0.5">
              Your saved DSA problems
            </p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => navigate('/dsa')} className="btn-ghost text-sm">
              DSA Explorer
            </button>
            <button onClick={() => navigate('/chat')} className="btn-ghost text-sm">
              ← Chat
            </button>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-6 h-6 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : data?.length === 0 ? (
          <div className="card p-12 text-center">
            <span className="text-4xl mb-4 block">★</span>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              No bookmarks yet
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              Save problems from the DSA Explorer
            </p>
            <button onClick={() => navigate('/dsa')} className="btn-primary text-xs">
              Browse Problems
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-gray-400 mb-4">
              {data?.length} saved problems
            </p>
            {data?.map((bookmark) => (
              <div key={bookmark._id} className="card p-4 flex items-center justify-between hover:shadow-sm transition-shadow">
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => navigate('/dsa')}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {bookmark.problemId.title}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${DIFFICULTY_STYLES[bookmark.problemId.difficulty]}`}>
                      {bookmark.problemId.difficulty}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 capitalize">
                    {bookmark.problemId.category?.replace('-', ' ')}
                  </span>
                </div>

                <button
                  onClick={() => removeMutation.mutate(bookmark.problemId._id)}
                  className="text-xs text-red-400 hover:text-red-600 transition-colors ml-4"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}