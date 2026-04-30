'use client';

import { useState } from "react";
import BlogForm from "@/components/BlogForm";
import BlogResult from "@/components/BlogResult";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [blogData, setBlogData] = useState<{ title: string; content: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { user, loading: authLoading } = useAuth();

  const handleGenerateBlog = async (topic: string, language: string) => {
    setIsLoading(true);
    setError(null);
    setBlogData(null);

    try {
      const response = await fetch("http://localhost:8000/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic, language }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate blog. Please ensure the backend is running.");
      }

      const result = await response.json();
      
      // The backend returns {"data": state} where state is BlogState
      // BlogState has `blog` which is {title: string, content: string}
      const data = result?.data?.blog;

      if (data && data.title && data.content) {
        setBlogData(data);
      } else {
        throw new Error("Invalid response format from the server.");
      }
    } catch (err: any) {
      console.error("Error generating blog:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setBlogData(null);
    setError(null);
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center text-zinc-500">Loading...</div>;

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-8 relative selection:bg-purple-500/30">
      {/* Background gradients */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full mix-blend-screen filter blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full mix-blend-screen filter blur-[120px]"></div>
      </div>

      <main className="z-10 flex flex-col items-center w-full max-w-5xl">
        {!blogData && (
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500">
              Agentic Blog Generator
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
              Harness the power of LangGraph and Groq to instantly generate high-quality, structured blog posts in multiple languages.
            </p>
          </div>
        )}

        {!user ? (
          <div className="glass-panel p-8 md:p-12 text-center rounded-3xl flex flex-col items-center gap-6 max-w-lg">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20 mb-2">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Login Required</h2>
            <p className="text-zinc-400">You must be logged in to generate amazing AI-powered blogs. Join us now!</p>
            <div className="flex gap-4 w-full mt-4">
              <Link href="/login" className="flex-1 py-3 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-colors">
                Log In
              </Link>
              <Link href="/signup" className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-xl transition-colors">
                Sign Up
              </Link>
            </div>
          </div>
        ) : (
          <>
            {error && (
              <div className="mb-8 p-4 w-full max-w-lg bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-center animate-in fade-in zoom-in-95">
                <p className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  {error}
                </p>
              </div>
            )}

            {!blogData ? (
              <div className="w-full flex justify-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
                <BlogForm onSubmit={handleGenerateBlog} isLoading={isLoading} />
              </div>
            ) : (
              <BlogResult data={blogData} onReset={handleReset} />
            )}
          </>
        )}
      </main>

      <footer className="z-10 fixed bottom-6 text-zinc-500 text-sm">
      </footer>
    </div>
  );
}
