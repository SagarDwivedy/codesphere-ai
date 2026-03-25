import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../api/axios';
import type { Problem } from '../types';

const DIFFICULTIES = ['all', 'easy', 'medium', 'hard'];
const CATEGORIES = [
  'all', 'array', 'string', 'linked-list', 'tree',
  'graph', 'dynamic-programming', 'sorting', 'searching', 'stack-queue',
];

const DIFFICULTY_STYLES: Record<string, string> = {
  easy: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
  medium: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400',
  hard: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
};

type Tab = 'problem' | 'solution' | 'explanation';

export default function DSAExplorer() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('all');
  const [category, setCategory] = useState('all');
  const [selected, setSelected] = useState<Problem | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('problem');
  const [explanation, setExplanation] = useState('');
  const [isExplaining, setIsExplaining] = useState(false);
  const [bookmarked, setBookmarked] = useState<Set<string>>(new Set());

  // Fetch problems
  const { data, isLoading } = useQuery({
    queryKey: ['problems', difficulty, category, search],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (difficulty !== 'all') params.set('difficulty', difficulty);
      if (category !== 'all') params.set('category', category);
      if (search) params.set('search', search);
      const { data } = await api.get(`/dsa?${params}`);
      return data.problems as Problem[];
    },
  });

  const handleSelect = async (problem: Problem) => {
    const { data } = await api.get(`/dsa/${problem.slug}`);
    setSelected(data.problem);
    setActiveTab('problem');
    setExplanation('');
  };

  const handleExplain = async () => {
    if (!selected) return;
    setActiveTab('explanation');
    setIsExplaining(true);
    setExplanation('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:5000/api/dsa/${selected.slug}/explain`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

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
      setIsExplaining(false);
    }
  };

  const handleBookmark = async () => {
    if (!selected) return;
    try {
      if (bookmarked.has(selected._id)) {
        await api.delete(`/bookmarks/${selected._id}`);
        setBookmarked((prev) => { const s = new Set(prev); s.delete(selected._id); return s; });
      } else {
        await api.post('/bookmarks', { problemId: selected._id });
        setBookmarked((prev) => new Set(prev).add(selected._id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen bg-white dark:bg-dark-primary overflow-hidden">

      {/* Problem List */}
      <div className="w-72 flex flex-col border-r border-gray-100 dark:border-dark-border flex-shrink-0">

        {/* Header */}
        <div className="p-4 border-b border-gray-100 dark:border-dark-border">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-sm font-semibold text-gray-900 dark:text-white">
              DSA Explorer
            </h1>
            <button
              onClick={() => navigate('/chat')}
              className="text-xs text-brand-600 hover:underline"
            >
              ← Chat
            </button>
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search problems..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input-field text-xs py-2 mb-3"
          />

          {/* Difficulty filter */}
          <div className="flex gap-1.5 flex-wrap mb-2">
            {DIFFICULTIES.map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`text-xs px-2.5 py-1 rounded-full capitalize font-medium transition-colors ${
                  difficulty === d
                    ? 'bg-brand-600 text-white'
                    : d === 'easy' ? 'bg-green-50 text-green-600 hover:bg-green-100'
                    : d === 'medium' ? 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
                    : d === 'hard' ? 'bg-red-50 text-red-600 hover:bg-red-100'
                    : 'bg-surface-secondary text-gray-600 hover:bg-surface-tertiary dark:bg-dark-tertiary dark:text-gray-400'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Category filter */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="input-field text-xs py-2"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c === 'all' ? 'All categories' : c.replace('-', ' ')}
              </option>
            ))}
          </select>
        </div>

        {/* Problem list */}
        <div className="flex-1 overflow-y-auto p-2">
          {isLoading ? (
            <div className="flex items-center justify-center h-20">
              <div className="w-5 h-5 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              <p className="text-xs text-gray-400 px-2 mb-2">
                {data?.length || 0} problems
              </p>
              {data?.map((problem) => (
                <button
                  key={problem._id}
                  onClick={() => handleSelect(problem)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                    selected?._id === problem._id
                      ? 'bg-brand-50 dark:bg-brand-900/20 border border-brand-200 dark:border-brand-800'
                      : 'hover:bg-surface-secondary dark:hover:bg-dark-tertiary'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-xs font-medium truncate flex-1 mr-2 ${
                      selected?._id === problem._id
                        ? 'text-brand-700 dark:text-brand-400'
                        : 'text-gray-800 dark:text-gray-200'
                    }`}>
                      {problem.title}
                    </span>
                    <span className={`text-xs px-1.5 py-0.5 rounded-full flex-shrink-0 ${DIFFICULTY_STYLES[problem.difficulty]}`}>
                      {problem.difficulty}
                    </span>
                  </div>
                  <span className="text-xs text-gray-400 capitalize">
                    {problem.category.replace('-', ' ')}
                  </span>
                </button>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Problem Detail */}
      <div className="flex-1 flex flex-col min-w-0">
        {selected ? (
          <>
            {/* Problem header */}
            <div className="px-6 py-4 border-b border-gray-100 dark:border-dark-border flex items-start justify-between">
              <div>
                <h2 className="text-base font-semibold text-gray-900 dark:text-white mb-2">
                  {selected.title}
                </h2>
                <div className="flex gap-2 flex-wrap">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${DIFFICULTY_STYLES[selected.difficulty]}`}>
                    {selected.difficulty}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-surface-secondary dark:bg-dark-tertiary text-gray-600 dark:text-gray-400 capitalize">
                    {selected.category.replace('-', ' ')}
                  </span>
                  {selected.tags?.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-surface-secondary dark:bg-dark-tertiary text-gray-500 dark:text-gray-500">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 flex-shrink-0 ml-4">
                <button
                  onClick={handleExplain}
                  disabled={isExplaining}
                  className="btn-primary text-xs py-1.5 px-3"
                >
                  {isExplaining ? 'Explaining...' : '✨ AI Explain'}
                </button>
                <button
                  onClick={handleBookmark}
                  className={`text-xs py-1.5 px-3 rounded-lg border transition-colors ${
                    bookmarked.has(selected._id)
                      ? 'bg-yellow-50 border-yellow-200 text-yellow-600'
                      : 'border-gray-200 dark:border-dark-border text-gray-600 dark:text-gray-400 hover:bg-surface-secondary'
                  }`}
                >
                  {bookmarked.has(selected._id) ? '★ Saved' : '☆ Bookmark'}
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-100 dark:border-dark-border px-6">
              {(['problem', 'solution', 'explanation'] as Tab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`text-xs py-3 px-4 capitalize font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      ? 'border-brand-600 text-brand-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="flex-1 overflow-y-auto p-6">

              {/* Problem tab */}
              {activeTab === 'problem' && (
                <div className="space-y-4 animate-fade-in">
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selected.description}
                  </p>

                  {selected.examples?.map((ex, i) => (
                    <div key={i}>
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                        Example {i + 1}
                      </p>
                      <div className="bg-surface-secondary dark:bg-dark-tertiary rounded-lg p-4 font-mono text-xs space-y-1">
                        <p><span className="text-gray-500">Input:</span> {ex.input}</p>
                        <p><span className="text-gray-500">Output:</span> {ex.output}</p>
                        {ex.explanation && (
                          <p><span className="text-gray-500">Explanation:</span> {ex.explanation}</p>
                        )}
                      </div>
                    </div>
                  ))}

                  {selected.constraints?.length > 0 && (
                    <div>
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                        Constraints
                      </p>
                      <ul className="space-y-1">
                        {selected.constraints.map((c, i) => (
                          <li key={i} className="text-xs text-gray-600 dark:text-gray-400 font-mono">
                            • {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="flex gap-3 pt-2">
                    <div className="bg-surface-secondary dark:bg-dark-tertiary rounded-lg px-4 py-3">
                      <p className="text-xs text-gray-400 mb-1">Time complexity</p>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 font-mono">
                        {selected.timeComplexity}
                      </p>
                    </div>
                    <div className="bg-surface-secondary dark:bg-dark-tertiary rounded-lg px-4 py-3">
                      <p className="text-xs text-gray-400 mb-1">Space complexity</p>
                      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 font-mono">
                        {selected.spaceComplexity}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Solution tab */}
              {activeTab === 'solution' && (
                <div className="animate-fade-in">
                  <div className="bg-gray-900 rounded-xl p-5 overflow-x-auto">
                    <pre className="text-sm text-green-400 font-mono leading-relaxed whitespace-pre-wrap">
                      {selected.solution}
                    </pre>
                  </div>
                </div>
              )}

              {/* Explanation tab */}
              {activeTab === 'explanation' && (
                <div className="animate-fade-in">
                  {explanation ? (
                    <div className="prose prose-sm max-w-none">
                      <pre className="whitespace-pre-wrap font-sans text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                        {explanation}
                      </pre>
                    </div>
                  ) : isExplaining ? (
                    <div className="flex gap-2 items-center text-sm text-gray-500">
                      <div className="w-4 h-4 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
                      CodeSphere AI is thinking...
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-sm text-gray-500 mb-3">
                        Click "AI Explain" to get a detailed explanation
                      </p>
                      <button onClick={handleExplain} className="btn-primary text-xs">
                        ✨ Get AI Explanation
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        ) : (
          /* Empty state */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-surface-secondary dark:bg-dark-tertiary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Select a problem
              </h3>
              <p className="text-xs text-gray-400">
                Choose from the list to view details
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}