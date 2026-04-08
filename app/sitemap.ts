import { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();
  const { data: profiles } = await supabase
    .from("profiles")
    .select("username, created_at");

  const userPages = (profiles || []).map((p) => ({
    url: `https://bio-link-builder-with-ai.vercel.app/${p.username}`,
    lastModified: new Date(p.created_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: "https://bio-link-builder-with-ai.vercel.app",
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...userPages,
  ];
}
