// import { MetadataRoute } from "next";
// import { createClient } from "@/lib/supabase/server";

// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   const supabase = await createClient();
//   const { data: profiles } = await supabase
//     .from("profiles")
//     .select("username, created_at");

//   const userPages = (profiles || []).map((p) => ({
//     url: `https://bio-link-builder-with-ai.vercel.app/${p.username}`,
//     lastModified: new Date(p.created_at),
//     changeFrequency: "weekly" as const,
//     priority: 0.7,
//   }));

//   return [
//     {
//       url: "https://bio-link-builder-with-ai.vercel.app",
//       lastModified: new Date(),
//       changeFrequency: "daily",
//       priority: 1,
//     },
//     ...userPages,
//   ];
// }
// import { MetadataRoute } from "next";
// import { createClient } from "@supabase/supabase-js";

// export const dynamic = "force-dynamic";

// export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//   );

//   const { data: profiles } = await supabase
//     .from("profiles")
//     .select("username, created_at");

//   const baseUrl = "https://bio-link-builder-with-ai.vercel.app";

//   const userPages = (profiles || []).map((p) => ({
//     url: `${baseUrl}/${p.username}`,
//     lastModified: new Date(p.created_at),
//     changeFrequency: "weekly" as const,
//     priority: 0.7,
//   }));

//   return [
//     {
//       url: baseUrl,
//       lastModified: new Date(),
//       changeFrequency: "daily" as const,
//       priority: 1,
//     },
//     ...userPages,
//   ];
// }
import { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!, // ← غيرنا للـ service role
  );

  const { data: profiles } = await supabase
    .from("profiles")
    .select("username, created_at");

  const baseUrl = "https://bio-link-builder-with-ai.vercel.app";

  const userPages = (profiles || []).map((p) => ({
    url: `${baseUrl}/${p.username}`,
    lastModified: new Date(p.created_at),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    ...userPages,
  ];
}
