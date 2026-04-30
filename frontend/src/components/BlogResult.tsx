'use client';

import { useState } from 'react';

interface BlogData {
  title: string;
  content: string;
}

interface BlogResultProps {
  data: BlogData | null;
  onReset: () => void;
}

export default function BlogResult({ data, onReset }: BlogResultProps) {
  const [isPublished, setIsPublished] = useState(false);

  if (!data) return null;

  const handlePublish = () => {
    try {
      const existing = localStorage.getItem('publishedBlogs');
      const blogs = existing ? JSON.parse(existing) : [];
      
      const newBlog = {
        id: Date.now().toString(),
        title: data.title,
        content: data.content,
        publishedAt: new Date().toISOString()
      };
      
      blogs.push(newBlog);
      localStorage.setItem('publishedBlogs', JSON.stringify(blogs));
      setIsPublished(true);
      
      // Optionally trigger an alert or toast here
    } catch (e) {
      console.error("Failed to publish blog:", e);
    }
  };

  return (
    <div className="w-full max-w-4xl glass-panel p-8 md:p-14 rounded-3xl flex flex-col gap-10 relative overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Decorative gradient orb */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl"></div>
      
      <div className="z-10 flex flex-col md:flex-row justify-between items-start gap-6 border-b border-zinc-800 pb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 tracking-tight leading-tight">
          {data.title || "Generated Blog"}
        </h1>
        <div className="flex items-center gap-3 shrink-0">
          <button 
            className={`flex items-center gap-2 px-5 py-2.5 font-semibold rounded-xl shadow-lg transition-all ${
              isPublished 
                ? 'bg-zinc-800 text-zinc-400 cursor-default'
                : 'bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-emerald-500/20 hover:scale-105'
            }`}
            onClick={isPublished ? undefined : handlePublish}
            disabled={isPublished}
          >
            {isPublished ? (
              <>
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Published
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
                Publish to My Blogs
              </>
            )}
          </button>
          <button 
            onClick={onReset}
            className="p-2.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors"
            title="Create New Blog"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
          </button>
        </div>
      </div>

      <div className="z-10 prose prose-invert prose-xl max-w-none text-zinc-300 leading-loose space-y-8">
        {data.content.split('\n').map((paragraph, index) => {
          if (!paragraph.trim()) return null;
          
          // Handle simple markdown-like headers with larger font sizes
          if (paragraph.startsWith('### ')) {
            return <h3 key={index} className="text-2xl font-bold text-white mt-12 mb-6">{paragraph.replace('### ', '')}</h3>;
          }
          if (paragraph.startsWith('## ')) {
            return <h2 key={index} className="text-3xl font-extrabold text-white mt-14 mb-8">{paragraph.replace('## ', '')}</h2>;
          }
          if (paragraph.startsWith('# ')) {
            return <h1 key={index} className="text-4xl font-extrabold text-white mt-16 mb-10">{paragraph.replace('# ', '')}</h1>;
          }
          if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
             return <li key={index} className="ml-6 text-lg md:text-xl">{paragraph.substring(2)}</li>;
          }
          
          return <p key={index} className="text-lg md:text-xl">{paragraph}</p>;
        })}
      </div>
    </div>
  );
}
