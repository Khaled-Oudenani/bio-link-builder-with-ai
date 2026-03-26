"use client";

import { useState } from "react";
import { Wand2, Loader2, Plus, X } from "lucide-react";

interface SuggestedLink {
  title: string;
  url: string;
}

interface Props {
  onAddLinks: (links: SuggestedLink[]) => void;
}

export default function AiLinkSuggester({ onAddLinks }: Props) {
  const [open, setOpen] = useState(false);
  const [profession, setProfession] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<SuggestedLink[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  async function handleSuggest() {
    if (!profession.trim()) return;
    setLoading(true);
    setSuggestions([]);
    setSelected(new Set());
    try {
      const res = await fetch("/api/suggest-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profession }),
      });
      const data = await res.json();
      if (data.links) setSuggestions(data.links);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  function toggleSelect(i: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  function handleAdd() {
    const toAdd = suggestions.filter((_, i) => selected.has(i));
    onAddLinks(toAdd);
    setOpen(false);
    setSuggestions([]);
    setProfession("");
    setSelected(new Set());
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-lg transition-all hover:opacity-80 w-fit"
        style={{ background: "rgba(247,106,143,0.12)", color: "#f76a8f" }}
      >
        <Wand2 size={13} />
        AI Suggest Links
      </button>
    );
  }

  return (
    <div
      className="p-4 rounded-xl border space-y-3"
      style={{
        background: "rgba(247,106,143,0.06)",
        borderColor: "rgba(247,106,143,0.25)",
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Wand2 size={14} style={{ color: "#f76a8f" }} />
          <span className="text-xs font-semibold" style={{ color: "#f76a8f" }}>
            AI Link Suggester
          </span>
        </div>
        <button onClick={() => setOpen(false)}>
          <X size={14} style={{ color: "var(--color-muted)" }} />
        </button>
      </div>

      <input
        value={profession}
        onChange={(e) => setProfession(e.target.value)}
        placeholder='e.g. "MERN stack developer, freelancer"'
        className="w-full px-3 py-2 rounded-lg border text-sm outline-none"
        style={{
          background: "var(--color-surface-2)",
          borderColor: "var(--color-border)",
          color: "var(--color-text)",
        }}
        onKeyDown={(e) => e.key === "Enter" && handleSuggest()}
      />

      <button
        onClick={handleSuggest}
        disabled={loading || !profession.trim()}
        className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
        style={{ background: "#f76a8f" }}
      >
        {loading && <Loader2 size={12} className="animate-spin" />}
        {loading ? "Generating..." : "Suggest Links"}
      </button>

      {suggestions.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs" style={{ color: "var(--color-muted)" }}>
            Select links to add:
          </p>
          {suggestions.map((s, i) => (
            <div
              key={i}
              onClick={() => toggleSelect(i)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg border cursor-pointer transition-all"
              style={{
                borderColor: selected.has(i)
                  ? "#f76a8f"
                  : "var(--color-border)",
                background: selected.has(i)
                  ? "rgba(247,106,143,0.1)"
                  : "var(--color-surface-2)",
              }}
            >
              <div
                className="w-4 h-4 rounded border flex items-center justify-center flex-shrink-0"
                style={{
                  borderColor: selected.has(i)
                    ? "#f76a8f"
                    : "var(--color-border)",
                  background: selected.has(i) ? "#f76a8f" : "transparent",
                }}
              >
                {selected.has(i) && (
                  <span className="text-white text-xs">✓</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-xs font-medium"
                  style={{ color: "var(--color-text)" }}
                >
                  {s.title}
                </p>
                <p
                  className="text-xs truncate"
                  style={{ color: "var(--color-muted)" }}
                >
                  {s.url}
                </p>
              </div>
            </div>
          ))}

          <button
            onClick={handleAdd}
            disabled={selected.size === 0}
            className="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90 disabled:opacity-40"
            style={{ background: "#f76a8f" }}
          >
            <Plus size={13} />
            Add {selected.size} Selected Link{selected.size !== 1 ? "s" : ""}
          </button>
        </div>
      )}
    </div>
  );
}
