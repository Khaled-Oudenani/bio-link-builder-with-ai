export type Plan = "free" | "pro";

export interface Profile {
  id: string;
  username: string;
  plan: Plan;
  created_at: string;
}

export interface Page {
  id: string;
  user_id: string;
  name: string;
  bio: string | null;
  avatar_url: string | null;
  theme: "default" | "dark" | "gradient" | "minimal";
  created_at: string;
}

export interface Link {
  id: string;
  page_id: string;
  title: string;
  url: string;
  icon: string | null;
  position: number;
  is_active: boolean;
}

export interface Click {
  id: string;
  link_id: string;
  page_id: string;
  referrer: string | null;
  clicked_at: string;
}

export interface PageWithLinks extends Page {
  links: Link[];
}

export interface AnalyticsSummary {
  total_clicks: number;
  clicks_by_link: { link_id: string; title: string; count: number }[];
  clicks_by_day: { date: string; count: number }[];
}
