'use client';

import { useState } from 'react';

interface BlogFormProps {
  onSubmit: (topic: string, language: string) => void;
  isLoading: boolean;
}

export default function BlogForm({ onSubmit, isLoading }: BlogFormProps) {
  const [topic, setTopic] = useState('');
  const [language, setLanguage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim()) {
      onSubmit(topic, language);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg glass-panel p-8 rounded-2xl flex flex-col gap-6 relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-glow"></div>
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      
      <div className="z-10 flex flex-col gap-2">
        <label htmlFor="topic" className="text-sm font-medium text-zinc-300 ml-1">
          Topic <span className="text-purple-400">*</span>
        </label>
        <input
          id="topic"
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., The Future of Artificial Intelligence"
          required
          disabled={isLoading}
          className="glass-input w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500/50"
        />
      </div>

      <div className="z-10 flex flex-col gap-2">
        <label htmlFor="language" className="text-sm font-medium text-zinc-300 ml-1">
          Language (Optional)
        </label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          disabled={isLoading}
          className="glass-input w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500/50 appearance-none bg-zinc-900/50"
        >
          <option value="">English (Default)</option>
          <option value="hindi">Hindi</option>
          <option value="french">French</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isLoading || !topic.trim()}
        className="z-10 mt-2 w-full py-3.5 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg transform transition-all duration-300 ease-in-out hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating Magic...
          </span>
        ) : (
          "Generate Blog Post"
        )}
      </button>
    </form>
  );
}
