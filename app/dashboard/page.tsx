import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, ExternalLink, BarChart3, Edit3, Layers } from "lucide-react";
import type { Page } from "@/types";
import DeletePageButton from "@/components/ui/DeletePageButton";

const THEME_COLORS: Record<
  string,
  { bg: string; accent: string; label: string }
> = {
  default: {
    bg: "linear-gradient(135deg, #f0f0ff 0%, #e8e4ff 100%)",
    accent: "#7c6af7",
    label: "Light",
  },
  dark: {
    bg: "linear-gradient(135deg, #0d0d12 0%, #1a1a25 100%)",
    accent: "#39ff88",
    label: "Dark",
  },
  gradient: {
    bg: "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    accent: "#f76a8f",
    label: "Cosmic",
  },
  minimal: {
    bg: "linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%)",
    accent: "#222",
    label: "Minimal",
  },
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, plan")
    .eq("id", user.id)
    .single();

  const { data: pages } = await supabase
    .from("pages")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  // إحصائيات سريعة
  const { count: totalClicks } = await supabase
    .from("clicks")
    .select("*", { count: "exact", head: true })
    .in(
      "page_id",
      (pages || []).map((p) => p.id),
    );

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1
            className="text-3xl font-extrabold tracking-tight"
            style={{ color: "var(--color-text)" }}
          >
            My Pages
          </h1>
          {profile?.username && (
            <p
              className="text-sm mt-1 font-mono"
              style={{ color: "var(--color-muted)" }}
            >
              /{profile.username}
            </p>
          )}
        </div>
        <Link
          href="/dashboard/new"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90 hover:scale-105 shadow-lg"
          style={{
            background:
              "linear-gradient(135deg, var(--color-accent), var(--color-accent-2))",
          }}
        >
          <Plus size={16} />
          New Page
        </Link>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {[
          { label: "Total Pages", value: pages?.length || 0 },
          { label: "Total Clicks", value: totalClicks || 0 },
        ].map((stat) => (
          <div
            key={stat.label}
            className="px-5 py-4 rounded-2xl border"
            style={{
              background: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            <p
              className="text-2xl font-extrabold"
              style={{ color: "var(--color-text)" }}
            >
              {stat.value}
            </p>
            <p
              className="text-xs mt-0.5"
              style={{ color: "var(--color-muted)" }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Pages grid */}
      {!pages || pages.length === 0 ? (
        <div
          className="rounded-2xl border border-dashed p-16 text-center"
          style={{ borderColor: "var(--color-border)" }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
            style={{ background: "var(--color-surface-2)" }}
          >
            <Layers size={24} style={{ color: "var(--color-muted)" }} />
          </div>
          <p
            className="font-semibold mb-1"
            style={{ color: "var(--color-text)" }}
          >
            No pages yet
          </p>
          <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
            Create your first bio link page.
          </p>
          <Link
            href="/dashboard/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: "var(--color-accent)" }}
          >
            <Plus size={15} /> Create first page
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(pages as Page[]).map((page) => {
            const themeStyle = THEME_COLORS[page.theme] || THEME_COLORS.default;
            return (
              <div
                key={page.id}
                className="rounded-2xl border overflow-hidden transition-all hover:-translate-y-1 hover:shadow-xl group"
                style={{
                  background: "var(--color-surface)",
                  borderColor: "var(--color-border)",
                }}
              >
                {/* Theme preview strip */}
                <div
                  className="h-20 w-full relative flex items-center justify-center"
                  style={{ background: themeStyle.bg }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: themeStyle.accent, color: "#fff" }}
                  >
                    {page.name.charAt(0).toUpperCase()}
                  </div>
                  {/* Theme badge */}
                  <span
                    className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full font-semibold"
                    style={{
                      background: "rgba(0,0,0,0.25)",
                      color: "#fff",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    {themeStyle.label}
                  </span>
                </div>

                {/* Card body */}
                <div className="p-4">
                  <h2
                    className="font-bold text-sm mb-1 truncate"
                    style={{ color: "var(--color-text)" }}
                  >
                    {page.name}
                  </h2>
                  {page.bio ? (
                    <p
                      className="text-xs line-clamp-2 mb-4"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {page.bio}
                    </p>
                  ) : (
                    <p
                      className="text-xs mb-4 italic"
                      style={{ color: "var(--color-border)" }}
                    >
                      No bio yet
                    </p>
                  )}

                  {/* Actions — كلها داخل البطاقة في صفين */}
                  <div className="grid grid-cols-3 gap-1.5 mb-1.5">
                    <Link
                      href={`/editor/${page.id}`}
                      className="flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80"
                      style={{
                        background: "var(--color-surface-2)",
                        color: "var(--color-text)",
                      }}
                    >
                      <Edit3 size={11} /> Edit
                    </Link>
                    <Link
                      href={`/analytics/${page.id}`}
                      className="flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80"
                      style={{
                        background: "var(--color-surface-2)",
                        color: "var(--color-text)",
                      }}
                    >
                      <BarChart3 size={11} /> Stats
                    </Link>
                    {profile?.username && (
                      <a
                        href={
                          pages.length === 1
                            ? `/${profile.username}`
                            : `/${profile.username}/${page.id}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80"
                        style={{
                          background: "rgba(124,106,247,0.15)",
                          color: "var(--color-accent)",
                        }}
                      >
                        <ExternalLink size={11} /> View
                      </a>
                    )}
                  </div>

                  {/* Delete — سطر منفصل كامل العرض */}
                  <DeletePageButton
                    pageId={page.id}
                    pageName={page.name}
                    fullWidth
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
