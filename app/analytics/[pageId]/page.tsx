import { createClient } from "@/lib/supabase/server";
import { redirect, notFound } from "next/navigation";
import AnalyticsClient from "@/components/analytics/AnalyticsClient";

export default async function AnalyticsPage({
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
    .select("id, title")
    .eq("page_id", pageId);

  // Clicks last 14 days
  const since = new Date();
  since.setDate(since.getDate() - 14);

  const { data: clicks } = await supabase
    .from("clicks")
    .select("link_id, clicked_at")
    .eq("page_id", pageId)
    .gte("clicked_at", since.toISOString());

  // Aggregate by day
  const dayMap: Record<string, number> = {};
  for (let i = 13; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dayMap[d.toISOString().split("T")[0]] = 0;
  }
  (clicks || []).forEach((c) => {
    const day = c.clicked_at.split("T")[0];
    if (dayMap[day] !== undefined) dayMap[day]++;
  });

  const clicksByDay = Object.entries(dayMap).map(([date, count]) => ({
    date: date.slice(5),
    count,
  }));

  // Aggregate by link
  const linkMap: Record<string, number> = {};
  (clicks || []).forEach((c) => {
    linkMap[c.link_id] = (linkMap[c.link_id] || 0) + 1;
  });
  const clicksByLink = (links || [])
    .map((l) => ({
      title: l.title,
      count: linkMap[l.id] || 0,
    }))
    .sort((a, b) => b.count - a.count);

  // Geo data
  const geoMap: Record<string, number> = {};
  (clicks || []).forEach((c) => {
    const country = c.country || "Unknown";
    geoMap[country] = (geoMap[country] || 0) + 1;
  });
  const clicksByCountry = Object.entries(geoMap)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <AnalyticsClient
      pageName={page.name}
      pageId={pageId}
      totalClicks={(clicks || []).length}
      clicksByDay={clicksByDay}
      clicksByLink={clicksByLink}
      clicksByCountry={clicksByCountry}
    />
  );
}
