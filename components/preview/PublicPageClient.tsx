"use client";

import Image from "next/image";
import type { Page, Link as LinkType } from "@/types";

interface Props {
  page: Page;
  links: LinkType[];
}

export default function PublicPageClient({ page, links }: Props) {
  const themeClass = `theme-${page.theme}`;

  async function handleLinkClick(link: LinkType) {
    // Track click in background
    fetch("/api/track-click", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ link_id: link.id, page_id: page.id }),
    }).catch(() => {});
    // Navigate
    window.open(link.url, "_blank", "noopener,noreferrer");
  }

  return (
    <div
      className={`${themeClass} min-h-screen flex flex-col items-center justify-start py-16 px-4`}
      style={{ background: "var(--page-bg)" }}
    >
      {page.theme === "gradient" && (
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, rgba(247,106,143,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(124,106,247,0.15) 0%, transparent 60%)",
          }}
        />
      )}

      <div className="w-full max-w-sm relative z-10">
        {/* Avatar & Name */}
        <div className="flex flex-col items-center text-center mb-8 animate-fade-up">
          {page.avatar_url ? (
            <Image
              src={page.avatar_url}
              alt={page.name}
              width={96}
              height={96}
              className="w-24 h-24 rounded-full object-cover mb-4 border-2"
              style={{ borderColor: "var(--page-accent)" }}
            />
          ) : (
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mb-4 text-3xl font-extrabold"
              style={{ background: "var(--page-card)", color: "var(--page-accent)" }}
            >
              {page.name.charAt(0).toUpperCase()}
            </div>
          )}

          <h1
            className="text-2xl font-extrabold tracking-tight"
            style={{ color: "var(--page-text)" }}
          >
            {page.name}
          </h1>

          {page.bio && (
            <p
              className="mt-2 text-sm leading-relaxed max-w-xs opacity-75"
              style={{ color: "var(--page-text)" }}
            >
              {page.bio}
            </p>
          )}
        </div>

        {/* Links */}
        <div className="space-y-3">
          {links.map((link, i) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link)}
              className="w-full px-5 py-3.5 rounded-2xl font-semibold text-sm border transition-all hover:-translate-y-0.5 hover:shadow-lg active:scale-95 animate-fade-up"
              style={{
                background: "var(--page-card)",
                color: "var(--page-text)",
                borderColor: "var(--page-border)",
                animationDelay: `${i * 80}ms`,
              }}
            >
              {link.title}
            </button>
          ))}
        </div>

        {/* Branding */}
        <div className="mt-10 text-center">
          <a
            href="/"
            className="text-xs opacity-30 hover:opacity-60 transition-opacity"
            style={{ color: "var(--page-text)" }}
          >
            Powered by LinkForge
          </a>
        </div>
      </div>
    </div>
  );
}
