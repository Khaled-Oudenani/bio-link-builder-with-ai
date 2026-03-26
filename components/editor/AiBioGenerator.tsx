"use client";

import { useState } from "react";
import { Sparkles, Loader2 } from "lucide-react";

interface Props {
  onGenerated: (bio: string) => void;
}

export default function AiBioGenerator({ onGenerated }: Props) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function generate() {
    if (!prompt.trim()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/generate-bio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.bio) {
        onGenerated(data.bio);
        setOpen(false);
        setPrompt("");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg transition-all hover:opacity-80 w-fit"
        style={{ background: "rgba(124,106,247,0.12)", color: "var(--color-accent)" }}
      >
        <Sparkles size={13} />
        Generate bio with AI
      </button>
    );
  }

  return (
    <div
      className="p-4 rounded-xl border space-y-3"
      style={{
        background: "rgba(124,106,247,0.06)",
        borderColor: "rgba(124,106,247,0.25)",
      }}
    >
      <div className="flex items-center gap-2">
        <Sparkles size={14} style={{ color: "var(--color-accent)" }} />
        <span className="text-xs font-semibold" style={{ color: "var(--color-accent)" }}>
          AI Bio Generator
        </span>
      </div>
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder='e.g. "MERN stack developer, freelancing for European clients"'
        className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
        style={{
          background: "var(--color-surface-2)",
          borderColor: "var(--color-border)",
          color: "var(--color-text)",
        }}
        onKeyDown={(e) => e.key === "Enter" && generate()}
      />
      <div className="flex gap-2">
        <button
          onClick={generate}
          disabled={loading || !prompt.trim()}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
          style={{ background: "var(--color-accent)" }}
        >
          {loading && <Loader2 size={12} className="animate-spin" />}
          {loading ? "Generating..." : "Generate"}
        </button>
        <button
          onClick={() => setOpen(false)}
          className="px-3 py-1.5 rounded-lg text-xs transition-all hover:bg-white/5"
          style={{ color: "var(--color-muted)" }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
