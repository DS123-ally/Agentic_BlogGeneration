'use client';

import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  // Redirect if already logged in
  if (user) {
    router.push('/');
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-8 relative">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full mix-blend-screen filter blur-[120px]"></div>
      </div>

      <div className="z-10 w-full max-w-md glass-panel p-8 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
          Welcome Back
        </h1>
        <p className="text-zinc-400 text-center mb-8">Sign in to your Agentic Blog account</p>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-zinc-300 ml-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 glass-input w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500/50"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-300 ml-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 glass-input w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-purple-500/50"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-zinc-400 text-sm">
          Don't have an account?{' '}
          <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
