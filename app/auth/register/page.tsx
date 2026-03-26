"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isValidUsername } from "@/lib/utils";
import { Loader2, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleRegister() {
    setError("");
    if (!isValidUsername(username)) {
      setError("Username must be 3–30 characters: letters, numbers, _ or -");
      return;
    }
    setLoading(true);
    const supabase = createClient();

    // Check username availability
    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .single();

    if (existing) {
      setError("Username is already taken. Try another one.");
      setLoading(false);
      return;
    }

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div
      className="p-8 rounded-2xl border"
      style={{
        background: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="mb-8">
        <Link href="/" className="text-2xl font-bold" style={{ color: "var(--color-text)" }}>
          Link<span style={{ color: "var(--color-accent)" }}>Forge</span>
        </Link>
        <p className="mt-2 text-sm" style={{ color: "var(--color-muted)" }}>
          Create your free account
        </p>
        {/* Step indicator */}
        <div className="flex items-center gap-2 mt-4">
          {[1, 2].map((s) => (
            <div
              key={s}
              className="h-1 flex-1 rounded-full transition-all"
              style={{
                background: s <= step ? "var(--color-accent)" : "var(--color-border)",
              }}
            />
          ))}
        </div>
      </div>

      {error && (
        <div
          className="mb-4 p-3 rounded-lg text-sm"
          style={{ background: "rgba(247,106,143,0.1)", color: "#f76a8f" }}
        >
          {error}
        </div>
      )}

      {step === 1 ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-muted)" }}>
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
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-muted)" }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min. 8 characters"
              className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:border-[var(--color-accent)]"
              style={{
                background: "var(--color-surface-2)",
                borderColor: "var(--color-border)",
                color: "var(--color-text)",
              }}
            />
          </div>
          <button
            onClick={() => {
              if (!email || !password) { setError("Please fill all fields"); return; }
              setError("");
              setStep(2);
            }}
            className="w-full py-2.5 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90"
            style={{ background: "var(--color-accent)" }}
          >
            Continue →
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-muted)" }}>
              Choose your username
            </label>
            <div
              className="flex items-center gap-0 rounded-xl border overflow-hidden"
              style={{ borderColor: "var(--color-border)" }}
            >
              <span
                className="px-3 py-2.5 text-sm border-r"
                style={{
                  background: "var(--color-surface-2)",
                  color: "var(--color-muted)",
                  borderColor: "var(--color-border)",
                }}
              >
                linkforge.app/
              </span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value.toLowerCase())}
                placeholder="yourname"
                className="flex-1 px-3 py-2.5 text-sm outline-none"
                style={{
                  background: "var(--color-surface-2)",
                  color: "var(--color-text)",
                }}
              />
              {username.length >= 3 && isValidUsername(username) && (
                <CheckCircle2 size={16} className="mr-3" style={{ color: "#39ff88" }} />
              )}
            </div>
            <p className="mt-1.5 text-xs" style={{ color: "var(--color-muted)" }}>
              Letters, numbers, _ and - only. This is your public link.
            </p>
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full py-2.5 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-60"
            style={{ background: "var(--color-accent)" }}
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            Create my page
          </button>
          <button
            onClick={() => setStep(1)}
            className="w-full text-sm"
            style={{ color: "var(--color-muted)" }}
          >
            ← Back
          </button>
        </div>
      )}

      <p className="mt-6 text-center text-sm" style={{ color: "var(--color-muted)" }}>
        Already have an account?{" "}
        <Link href="/auth/login" className="font-medium" style={{ color: "var(--color-accent)" }}>
          Sign in
        </Link>
      </p>
    </div>
  );
}
