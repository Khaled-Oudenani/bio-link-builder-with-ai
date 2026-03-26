import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import EditorClient from "@/components/editor/EditorClient";

export default async function EditorPage({
  params,
}: {
  params: Promise<{ pageId: string }>;
}) {
  const { pageId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: page } = await supabase
    .from("pages")
    .select("*")
    .eq("id", pageId)
    .eq("user_id", user.id)
    .single();

  if (!page) notFound();

  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("page_id", pageId)
    .order("position", { ascending: true });

  return <EditorClient page={page} initialLinks={links || []} />;
}
