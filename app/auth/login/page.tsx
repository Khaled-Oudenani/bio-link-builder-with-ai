"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin() {
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  }

  return (
    <div
      className="p-6 sm:p-8 rounded-2xl border max-w-md mx-auto"
      style={{
        background: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="mb-8">
        <Link
          href="/"
          className="text-xl sm:text-2xl font-bold"
          style={{ color: "var(--color-text)" }}
        >
          Link<span style={{ color: "var(--color-accent)" }}>Forge</span>
        </Link>
        <p
          className="mt-2 text-xs sm:text-sm"
          style={{ color: "var(--color-muted)" }}
        >
          Sign in to your account
        </p>
      </div>

      {error && (
        <div
          className="mb-4 p-3 rounded-lg text-xs sm:text-sm"
          style={{ background: "rgba(247,106,143,0.1)", color: "#f76a8f" }}
        >
          {error}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label
            className="block text-xs sm:text-sm font-medium mb-1.5"
            style={{ color: "var(--color-muted)" }}
          >
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:border-[var(--color-accent)]"
            style={{
              background: "var(--color-surface-2)",
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
          />
        </div>
        <div>
          <label
            className="block text-xs sm:text-sm font-medium mb-1.5"
            style={{ color: "var(--color-muted)" }}
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:border-[var(--color-accent)]"
            style={{
              background: "var(--color-surface-2)",
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full py-2.5 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-60"
          style={{ background: "var(--color-accent)" }}
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          Sign In
        </button>
      </div>

      <p
        className="mt-6 text-center text-xs sm:text-sm"
        style={{ color: "var(--color-muted)" }}
      >
        Don&apos;t have an account?{" "}
        <Link
          href="/auth/register"
          className="font-medium"
          style={{ color: "var(--color-accent)" }}
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
