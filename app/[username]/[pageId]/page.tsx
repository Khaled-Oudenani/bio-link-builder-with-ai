import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import PublicPageClient from "@/components/preview/PublicPageClient";

export default async function PublicPageById({
  params,
}: {
  params: Promise<{ username: string; pageId: string }>;
}) {
  const { username, pageId } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .single();

  if (!profile) notFound();

  const { data: page } = await supabase
    .from("pages")
    .select("*")
    .eq("id", pageId)
    .eq("user_id", profile.id)
    .single();

  if (!page) notFound();

  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("page_id", page.id)
    .eq("is_active", true)
    .order("position", { ascending: true });

  return <PublicPageClient page={page} links={links || []} />;
}
