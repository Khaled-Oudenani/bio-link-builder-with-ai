"use client";

import { useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import type { Page, Link as LinkType } from "@/types";
import AvatarUpload from "./AvatarUpload";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import SortableLinkCard from "./SortableLinkCard";
import AiBioGenerator from "./AiBioGenerator";
import PagePreview from "@/components/preview/PagePreview";
import {
  ArrowLeft,
  Plus,
  Save,
  Loader2,
  Eye,
  EyeOff,
  Palette,
} from "lucide-react";
import AiLinkSuggester from "./AiLinkSuggester";
import Link from "next/link";

const THEMES = [
  { id: "default", label: "Light" },
  { id: "dark", label: "Dark" },
  { id: "gradient", label: "Cosmic" },
  { id: "minimal", label: "Minimal" },
];

interface Props {
  page: Page;
  initialLinks: LinkType[];
}

export default function EditorClient({ page, initialLinks }: Props) {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState(page.name);
  const [bio, setBio] = useState(page.bio || "");
  const [avatarUrl, setAvatarUrl] = useState(page.avatar_url || "");
  const [theme, setTheme] = useState(page.theme);
  const [links, setLinks] = useState<LinkType[]>(initialLinks);
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showThemes, setShowThemes] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = links.findIndex((l) => l.id === active.id);
      const newIndex = links.findIndex((l) => l.id === over.id);
      setLinks(arrayMove(links, oldIndex, newIndex));
    }
  }

  async function addLink() {
    const { data, error } = await supabase
      .from("links")
      .insert({
        page_id: page.id,
        title: "New Link",
        url: "https://",
        position: links.length,
        is_active: true,
      })
      .select()
      .single();
    if (!error && data) setLinks((prev) => [...prev, data]);
  }

  //
  async function addMultipleLinks(newLinks: { title: string; url: string }[]) {
    for (const l of newLinks) {
      const { data, error } = await supabase
        .from("links")
        .insert({
          page_id: page.id,
          title: l.title,
          url: l.url,
          position: links.length,
          is_active: true,
        })
        .select()
        .single();
      if (!error && data) setLinks((prev) => [...prev, data]);
    }
  }
  //

  function updateLink(id: string, updates: Partial<LinkType>) {
    setLinks((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...updates } : l)),
    );
  }

  async function deleteLink(id: string) {
    await supabase.from("links").delete().eq("id", id);
    setLinks((prev) => prev.filter((l) => l.id !== id));
  }

  async function handleSave() {
    setSaving(true);
    setSaveMsg("");

    await supabase
      .from("pages")
      .update({ name, bio, avatar_url: avatarUrl, theme })
      .eq("id", page.id);

    for (let i = 0; i < links.length; i++) {
      const l = links[i];
      await supabase
        .from("links")
        .update({
          title: l.title,
          url: l.url,
          is_active: l.is_active,
          position: i,
        })
        .eq("id", l.id);
    }

    setSaving(false);
    setSaveMsg("Saved!");
    setTimeout(() => setSaveMsg(""), 2000);
    router.refresh();
  }

  const previewData = {
    ...page,
    name,
    bio,
    avatar_url: avatarUrl,
    theme,
    links,
  };

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Top bar */}
      <header
        className="sticky top-0 z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 px-4 sm:px-6 py-3 border-b"
        style={{
          background: "var(--color-surface)",
          borderColor: "var(--color-border)",
        }}
      >
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            href="/dashboard"
            className="p-1.5 rounded-lg transition-all hover:bg-white/5"
            style={{ color: "var(--color-muted)" }}
          >
            <ArrowLeft size={16} />
          </Link>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent text-sm font-semibold outline-none flex-1 sm:flex-initial"
            style={{ color: "var(--color-text)" }}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
          <button
            onClick={() => setShowThemes(!showThemes)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all hover:bg-white/5"
            style={{ color: "var(--color-muted)" }}
          >
            <Palette size={14} />
            Theme
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all hover:bg-white/5"
            style={{ color: "var(--color-muted)" }}
          >
            {showPreview ? <EyeOff size={14} /> : <Eye size={14} />}
            Preview
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white transition-all hover:opacity-90 disabled:opacity-60"
            style={{ background: "var(--color-accent)" }}
          >
            {saving ? (
              <Loader2 size={13} className="animate-spin" />
            ) : (
              <Save size={13} />
            )}
            {saveMsg || "Save"}
          </button>
        </div>
      </header>

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Editor panel */}
        <div
          className={`flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto ${showPreview ? "lg:max-w-lg" : ""}`}
        >
          {/* Theme picker inline */}
          {showThemes && (
            <div
              className="mb-6 p-4 rounded-2xl border"
              style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <p
                className="text-xs font-semibold mb-3"
                style={{ color: "var(--color-muted)" }}
              >
                CHOOSE THEME
              </p>
              <div className="flex gap-2 flex-wrap">
                {THEMES.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id as Page["theme"]);
                      setShowThemes(false);
                    }}
                    className="px-4 py-1.5 rounded-lg text-xs font-medium border transition-all"
                    style={{
                      borderColor:
                        theme === t.id
                          ? "var(--color-accent)"
                          : "var(--color-border)",
                      background:
                        theme === t.id
                          ? "rgba(124,106,247,0.15)"
                          : "var(--color-surface-2)",
                      color:
                        theme === t.id
                          ? "var(--color-accent)"
                          : "var(--color-muted)",
                    }}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Profile section */}
          <section className="mb-8">
            <h2
              className="text-xs font-semibold mb-4 uppercase tracking-widest"
              style={{ color: "var(--color-muted)" }}
            >
              Profile
            </h2>
            <div className="space-y-3">
              {/* <input
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="Avatar image URL (optional)"
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all"
                style={{
                  background: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-text)",
                }}
              /> */}
              <AvatarUpload
                currentUrl={avatarUrl}
                onUploaded={(url) => setAvatarUrl(url)}
              />
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Write your bio here..."
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all resize-none"
                style={{
                  background: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-text)",
                }}
              />
              <AiBioGenerator onGenerated={(text) => setBio(text)} />
            </div>
          </section>

          {/* Links section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--color-muted)" }}
              >
                Links ({links.length})
              </h2>
              <button
                onClick={addLink}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80"
                style={{
                  background: "rgba(124,106,247,0.15)",
                  color: "var(--color-accent)",
                }}
              >
                <Plus size={13} />
                Add Link
              </button>
            </div>
            <AiLinkSuggester onAddLinks={addMultipleLinks} />
            {links.length === 0 ? (
              <div
                className="rounded-2xl border border-dashed p-10 text-center"
                style={{ borderColor: "var(--color-border)" }}
              >
                <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                  No links yet. Click &ldquo;Add Link&rdquo; to get started.
                </p>
              </div>
            ) : (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={links.map((l) => l.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2">
                    {links.map((link) => (
                      <SortableLinkCard
                        key={link.id}
                        link={link}
                        onUpdate={updateLink}
                        onDelete={deleteLink}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}
          </section>
        </div>

        {/* Preview panel */}
        {showPreview && (
          <div
            className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l sticky top-14 lg:top-14 h-auto lg:h-[calc(100vh-56px)] overflow-y-auto p-4 sm:p-6 lg:p-0"
            style={{ borderColor: "var(--color-border)" }}
          >
            <PagePreview data={previewData} />
          </div>
        )}
      </div>
    </div>
  );
}
