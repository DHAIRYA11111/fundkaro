"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, AlertCircle, Sparkles } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to sign in");
      }

      // Redirect based on role or to home
      if (data.user?.role === "creator") {
        router.push("/creator/dashboard");
      } else {
        router.push("/backer/dashboard");
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block text-3xl font-extrabold text-brand-600 mb-2">
            ChandaDedo
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">Sign in to ChandaDedo</h1>
          <p className="text-slate-500 mt-2 text-sm">Welcome back! Access your campaigns & pledges.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
            <span>{error}</span>
          </div>
        )}

        {/* Demo One-Click Login Pills */}
        <div className="mb-6 p-3 bg-brand-50/70 border border-brand-200/80 rounded-xl">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-800 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>One-Click Demo Accounts:</span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin("arjun@chandadedo.in", "Creator@1234")}
              className="flex-1 text-xs py-1.5 px-2 bg-white rounded-lg border border-brand-200 hover:bg-brand-100/60 font-medium text-slate-700 transition-colors"
            >
              Demo Creator
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("ravi@chandadedo.in", "Backer@1234")}
              className="flex-1 text-xs py-1.5 px-2 bg-white rounded-lg border border-brand-200 hover:bg-brand-100/60 font-medium text-slate-700 transition-colors"
            >
              Demo Backer
            </button>
          </div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="input-modern"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="input-modern pr-11"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-brand-primary w-full py-3.5 text-base shadow-md shadow-brand-500/20 disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <span>Sign In</span>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-600">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="font-semibold text-brand-600 hover:text-brand-700">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
