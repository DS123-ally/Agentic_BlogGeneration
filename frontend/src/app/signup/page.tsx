'use client';

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  if (user) {
    router.push('/');
    return null;
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (err: any) {
      setError(err.message || 'Failed to create an account');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-8 relative">
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full mix-blend-screen filter blur-[120px]"></div>
      </div>

      <div className="z-10 w-full max-w-md glass-panel p-8 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-500">
          Create Account
        </h1>
        <p className="text-zinc-400 text-center mb-8">Join Agentic Blog Generator</p>

        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-zinc-300 ml-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 glass-input w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500/50"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-zinc-300 ml-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 glass-input w-full px-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500/50"
              required
              minLength={6}
            />
            <p className="text-xs text-zinc-500 mt-1 ml-1">Must be at least 6 characters</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full py-3 bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-semibold rounded-xl shadow-lg transition-all hover:scale-[1.02] disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-zinc-400 text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
