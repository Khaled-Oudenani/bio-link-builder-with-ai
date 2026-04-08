// import { createClient } from "@/lib/supabase/server";
// import { notFound } from "next/navigation";
// import PublicPageClient from "@/components/preview/PublicPageClient";

// export default async function PublicPage({
//   params,
// }: {
//   params: Promise<{ username: string }>;
// }) {
//   const { username } = await params;
//   const supabase = await createClient();

//   const { data: profile } = await supabase
//     .from("profiles")
//     .select("id, username")
//     .eq("username", username)
//     .single();

//   if (!profile) notFound();

//   const { data: page } = await supabase
//     .from("pages")
//     .select("*")
//     .eq("user_id", profile.id)
//     .order("created_at", { ascending: true })
//     .limit(1)
//     .single();

//   if (!page) notFound();

//   const { data: links } = await supabase
//     .from("links")
//     .select("*")
//     .eq("page_id", page.id)
//     .eq("is_active", true)
//     .order("position", { ascending: true });

//   return <PublicPageClient page={page} links={links || []} />;
// }

import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import PublicPageClient from "@/components/preview/PublicPageClient";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ username: string }>;
}): Promise<Metadata> {
  const { username } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .single();

  if (!profile) return { title: "Not Found" };

  const { data: page } = await supabase
    .from("pages")
    .select("name, bio")
    .eq("user_id", profile.id)
    .single();

  return {
    title: page?.name || username,
    description: page?.bio || `Check out ${username}'s links on LinkForge.`,
    openGraph: {
      title: page?.name || username,
      description: page?.bio || `Check out ${username}'s links on LinkForge.`,
      url: `https://bio-link-builder-with-ai.vercel.app/${username}`,
    },
  };
}

export default async function PublicPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username")
    .eq("username", username)
    .single();

  if (!profile) notFound();

  const { data: pages } = await supabase
    .from("pages")
    .select("*")
    .eq("user_id", profile.id)
    .order("created_at", { ascending: true });

  if (!pages || pages.length === 0) notFound();

  // إذا عنده صفحة واحدة فقط — اعرضها مباشرة
  if (pages.length === 1) {
    const { data: links } = await supabase
      .from("links")
      .select("*")
      .eq("page_id", pages[0].id)
      .eq("is_active", true)
      .order("position", { ascending: true });

    return <PublicPageClient page={pages[0]} links={links || []} />;
  }

  // إذا عنده أكثر من صفحة — اعرض قائمة للاختيار
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "var(--color-bg)" }}
    >
      <h1
        className="text-2xl font-bold mb-2"
        style={{ color: "var(--color-text)" }}
      >
        @{username}
      </h1>
      <p className="text-sm mb-8" style={{ color: "var(--color-muted)" }}>
        Choose a page
      </p>
      <div className="w-full max-w-sm space-y-3">
        {pages.map((page) => (
          <Link
            key={page.id}
            href={`/${username}/${page.id}`}
            className="block w-full px-5 py-3.5 rounded-2xl font-semibold text-sm border text-center transition-all hover:-translate-y-0.5"
            style={{
              background: "var(--color-surface)",
              color: "var(--color-text)",
              borderColor: "var(--color-border)",
            }}
          >
            {page.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
