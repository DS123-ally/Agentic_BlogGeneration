'use client';

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-64 h-screen border-r border-zinc-800 bg-zinc-950/50 backdrop-blur-md flex flex-col shrink-0">
      <div className="p-6 border-b border-zinc-800 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
        </div>
        <h1 className="font-bold text-lg text-white tracking-tight">Agentic Blog</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link 
          href="/" 
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${
            isActive('/') ? 'bg-purple-500/10 text-purple-400' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
          </svg>
          New Generation
        </Link>
        <Link 
          href="/my-blogs" 
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${
            isActive('/my-blogs') ? 'bg-purple-500/10 text-purple-400' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
          My Blogs
        </Link>
      </nav>
      
      <div className="p-4 border-t border-zinc-800">
        {user ? (
          <div className="flex flex-col gap-2">
            <div className="px-3 py-2 text-xs text-zinc-500 truncate">
              {user.email}
            </div>
            <button 
              onClick={logout}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-zinc-400 font-medium transition-colors hover:bg-red-500/10 hover:text-red-400"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
              </svg>
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <Link 
              href="/login"
              className="flex items-center justify-center w-full px-3 py-2.5 rounded-xl bg-purple-600/20 text-purple-400 font-medium transition-colors hover:bg-purple-600/30"
            >
              Log In
            </Link>
            <Link 
              href="/signup"
              className="flex items-center justify-center w-full px-3 py-2.5 rounded-xl text-zinc-400 font-medium transition-colors hover:bg-zinc-800 hover:text-white"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
