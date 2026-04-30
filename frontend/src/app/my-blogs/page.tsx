'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

interface PublishedBlog {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
}

export default function MyBlogs() {
  const [blogs, setBlogs] = useState<PublishedBlog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<PublishedBlog | null>(null);
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    const existing = localStorage.getItem('publishedBlogs');
    if (existing) {
      try {
        const parsed = JSON.parse(existing);
        setBlogs(parsed.sort((a: PublishedBlog, b: PublishedBlog) => 
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        ));
      } catch (e) {
        console.error("Failed to parse blogs", e);
      }
    }
  }, []);

  const handleDelete = (id: string) => {
    const updated = blogs.filter(b => b.id !== id);
    setBlogs(updated);
    localStorage.setItem('publishedBlogs', JSON.stringify(updated));
    if (selectedBlog?.id === id) {
      setSelectedBlog(null);
    }
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center text-zinc-500">Loading...</div>;

  return (
    <div className="min-h-full p-8 md:p-12 relative flex flex-col items-center">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-900/20 rounded-full mix-blend-screen filter blur-[120px]"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full mix-blend-screen filter blur-[120px]"></div>
      </div>

      <div className="z-10 w-full max-w-5xl">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-10 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">
          My Published Blogs
        </h1>

        {!user ? (
          <div className="glass-panel p-8 md:p-12 text-center rounded-3xl flex flex-col items-center gap-6 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 mb-2">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Login to View Blogs</h2>
            <p className="text-zinc-400">Sign in to your account to view and manage your generated blogs.</p>
            <div className="flex gap-4 w-full mt-4">
              <Link href="/login" className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors">
                Log In
              </Link>
              <Link href="/signup" className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="glass-panel p-12 text-center rounded-2xl flex flex-col items-center gap-4">
            <svg className="w-16 h-16 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            <p className="text-xl text-zinc-400">You haven't published any blogs yet.</p>
          </div>
        ) : !selectedBlog ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {blogs.map((blog) => (
              <div 
                key={blog.id} 
                className="glass-panel p-6 rounded-2xl flex flex-col gap-4 cursor-pointer hover:bg-zinc-800/30 hover:-translate-y-1 transition-all duration-300 group"
                onClick={() => setSelectedBlog(blog)}
              >
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-zinc-200 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                    {blog.title || "Untitled Blog"}
                  </h3>
                  <button 
                    onClick={(e) => { e.stopPropagation(); handleDelete(blog.id); }}
                    className="p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                    </svg>
                  </button>
                </div>
                <p className="text-zinc-500 text-sm line-clamp-3">
                  {blog.content.replace(/[#*]/g, '')}
                </p>
                <div className="mt-auto pt-4 border-t border-zinc-800/50 flex items-center justify-between">
                  <span className="text-xs text-zinc-600">
                    {new Date(blog.publishedAt).toLocaleDateString()}
                  </span>
                  <span className="text-xs font-medium text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read More →
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full max-w-4xl glass-panel p-8 md:p-14 rounded-3xl flex flex-col gap-10 relative overflow-hidden animate-in zoom-in-95 duration-500 mx-auto">
            <div className="z-10 flex flex-col md:flex-row justify-between items-start gap-6 border-b border-zinc-800 pb-8">
              <div>
                <button 
                  onClick={() => setSelectedBlog(null)}
                  className="mb-4 flex items-center gap-2 text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                  </svg>
                  Back to List
                </button>
                <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 tracking-tight leading-tight">
                  {selectedBlog.title || "Untitled Blog"}
                </h1>
                <p className="text-sm text-zinc-500 mt-3">Published on {new Date(selectedBlog.publishedAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="z-10 prose prose-invert prose-xl max-w-none text-zinc-300 leading-loose space-y-8">
              {selectedBlog.content.split('\n').map((paragraph, index) => {
                if (!paragraph.trim()) return null;
                
                if (paragraph.startsWith('### ')) return <h3 key={index} className="text-2xl font-bold text-white mt-12 mb-6">{paragraph.replace('### ', '')}</h3>;
                if (paragraph.startsWith('## ')) return <h2 key={index} className="text-3xl font-extrabold text-white mt-14 mb-8">{paragraph.replace('## ', '')}</h2>;
                if (paragraph.startsWith('# ')) return <h1 key={index} className="text-4xl font-extrabold text-white mt-16 mb-10">{paragraph.replace('# ', '')}</h1>;
                if (paragraph.startsWith('- ') || paragraph.startsWith('* ')) return <li key={index} className="ml-6 text-lg md:text-xl">{paragraph.substring(2)}</li>;
                
                return <p key={index} className="text-lg md:text-xl">{paragraph}</p>;
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
