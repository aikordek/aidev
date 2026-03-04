"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const { signIn, signInWithGoogle } = useAuth();
  const router = useRouter();
  const params = useParams();
  const lang = (params.lang as string) || "en";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    await signInWithGoogle(lang);
    // page will redirect; no need to reset state
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const { error: authError } = await signIn(email, password);

    if (authError) {
      setError(authError.message);
      setSubmitting(false);
    } else {
      router.replace(`/${lang}/intranet`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Sign In</h1>
          <p className="text-sm text-slate-500 mt-2">
            Sign in to access the intranet
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting || googleLoading}
            className="w-full px-6 py-3 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-lg font-medium transition-colors"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 border-t border-slate-200" />
          <span className="text-xs text-slate-400 uppercase tracking-wide">or</span>
          <div className="flex-1 border-t border-slate-200" />
        </div>

        <button
          onClick={handleGoogleSignIn}
          disabled={googleLoading || submitting}
          className="w-full flex items-center justify-center gap-3 px-6 py-3 bg-white border border-slate-300 hover:bg-slate-50 disabled:opacity-50 text-slate-700 rounded-lg font-medium transition-colors shadow-sm"
        >
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#4285F4" d="M47.5 24.5c0-1.6-.1-3.2-.4-4.7H24v8.9h13.2c-.6 3-2.3 5.5-4.9 7.2v6h7.9c4.6-4.3 7.3-10.6 7.3-17.4z"/>
            <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.9-6c-2.1 1.4-4.8 2.3-8 2.3-6.1 0-11.3-4.1-13.2-9.7H2.7v6.2C6.7 42.9 14.8 48 24 48z"/>
            <path fill="#FBBC05" d="M10.8 28.8c-.5-1.4-.8-2.8-.8-4.3s.3-3 .8-4.4v-6.2H2.7C1 17.1 0 20.4 0 24s1 6.9 2.7 9.9l8.1-5.1z"/>
            <path fill="#EA4335" d="M24 9.6c3.4 0 6.5 1.2 8.9 3.5l6.6-6.6C35.9 2.5 30.4 0 24 0 14.8 0 6.7 5.1 2.7 14.1l8.1 5.1C12.7 13.7 17.9 9.6 24 9.6z"/>
          </svg>
          {googleLoading ? "Redirecting…" : "Sign in with Google"}
        </button>

        <div className="mt-6 text-center">
          <Link
            href={`/${lang}`}
            className="text-sm text-slate-500 hover:text-amber-600 transition-colors"
          >
            Back to site
          </Link>
        </div>
      </div>
    </div>
  );
}
