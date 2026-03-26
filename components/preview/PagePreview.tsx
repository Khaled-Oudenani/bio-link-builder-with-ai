"use client";

import Image from "next/image";
import type { Page, Link as LinkType } from "@/types";

interface PreviewData extends Page {
  links: LinkType[];
}

export default function PagePreview({ data }: { data: PreviewData }) {
  const themeClass = `theme-${data.theme}`;

  return (
    <div className={`${themeClass} h-full p-4`} style={{ background: "var(--page-bg)" }}>
      <div className="text-xs font-semibold mb-3 text-center opacity-50" style={{ color: "var(--page-text)" }}>
        PREVIEW
      </div>

      <div className="flex flex-col items-center text-center mb-6">
        {data.avatar_url ? (
          <Image
            src={data.avatar_url}
            alt={data.name}
            width={64}
            height={64}
            className="w-16 h-16 rounded-full object-cover mb-3 border-2"
            style={{ borderColor: "var(--page-accent)" }}
          />
        ) : (
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-3 text-2xl font-bold"
            style={{ background: "var(--page-card)", color: "var(--page-accent)" }}
          >
            {data.name.charAt(0).toUpperCase()}
          </div>
        )}
        <h1 className="font-bold text-lg" style={{ color: "var(--page-text)" }}>
          {data.name}
        </h1>
        {data.bio && (
          <p className="text-xs mt-1 leading-relaxed opacity-70" style={{ color: "var(--page-text)" }}>
            {data.bio}
          </p>
        )}
      </div>

      <div className="space-y-2">
        {data.links
          .filter((l) => l.is_active)
          .map((link) => (
            <div
              key={link.id}
              className="w-full px-4 py-2.5 rounded-xl text-sm font-medium text-center border cursor-pointer transition-all hover:opacity-80"
              style={{
                background: "var(--page-card)",
                color: "var(--page-text)",
                borderColor: "var(--page-border)",
              }}
            >
              {link.title}
            </div>
          ))}
        {data.links.filter((l) => l.is_active).length === 0 && (
          <p className="text-center text-xs opacity-40" style={{ color: "var(--page-text)" }}>
            No active links yet
          </p>
        )}
      </div>
    </div>
  );
}
