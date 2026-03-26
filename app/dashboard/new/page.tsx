"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

const THEMES = [
  { id: "default", label: "Clean Light", colors: ["#ffffff", "#7c6af7", "#f4f4f8"] },
  { id: "dark", label: "Midnight", colors: ["#0d0d12", "#39ff88", "#1a1a25"] },
  { id: "gradient", label: "Cosmic", colors: ["#0f0c29", "#f76a8f", "rgba(255,255,255,0.1)"] },
  { id: "minimal", label: "Minimal", colors: ["#fafafa", "#222222", "#ffffff"] },
];

export default function NewPagePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("default");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleCreate() {
    if (!name.trim()) { setError("Page name is required"); return; }
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/auth/login"); return; }

    const { data, error: err } = await supabase
      .from("pages")
      .insert({ user_id: user.id, name: name.trim(), theme })
      .select()
      .single();

    if (err) { setError(err.message); setLoading(false); return; }
    router.push(`/editor/${data.id}`);
  }

  return (
    <div className="max-w-lg mx-auto">
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm mb-8 transition-colors hover:opacity-80"
        style={{ color: "var(--color-muted)" }}
      >
        <ArrowLeft size={14} />
        Back to dashboard
      </Link>

      <h1 className="text-2xl font-bold mb-2" style={{ color: "var(--color-text)" }}>
        Create New Page
      </h1>
      <p className="text-sm mb-8" style={{ color: "var(--color-muted)" }}>
        You can edit everything later — let&apos;s start with the basics.
      </p>

      {error && (
        <div className="mb-4 p-3 rounded-lg text-sm" style={{ background: "rgba(247,106,143,0.1)", color: "#f76a8f" }}>
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: "var(--color-muted)" }}>
            Page Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. My Portfolio, Work Links..."
            className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:border-[var(--color-accent)]"
            style={{
              background: "var(--color-surface)",
              borderColor: "var(--color-border)",
              color: "var(--color-text)",
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-3" style={{ color: "var(--color-muted)" }}>
            Choose Theme
          </label>
          <div className="grid grid-cols-2 gap-3">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className="p-4 rounded-xl border text-left transition-all"
                style={{
                  background: t.colors[0],
                  borderColor: theme === t.id ? "var(--color-accent)" : "var(--color-border)",
                  boxShadow: theme === t.id ? "0 0 0 2px var(--color-accent)" : "none",
                }}
              >
                <div className="flex gap-1.5 mb-2">
                  {t.colors.map((c, i) => (
                    <div key={i} className="w-4 h-4 rounded-full" style={{ background: c }} />
                  ))}
                </div>
                <span
                  className="text-xs font-semibold"
                  style={{ color: t.id === "default" || t.id === "minimal" ? "#1a1a2e" : "#ffffff" }}
                >
                  {t.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleCreate}
          disabled={loading}
          className="w-full py-3 rounded-xl font-semibold text-white text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-60"
          style={{ background: "var(--color-accent)" }}
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          Create Page & Start Editing →
        </button>
      </div>
    </div>
  );
}
