import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import SignOutButton from "@/components/ui/SignOutButton";
import { LayoutDashboard, LogOut, ExternalLink } from "lucide-react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Sidebar */}
      <aside
        className="w-full lg:w-56 border-b lg:border-b-0 lg:border-r flex flex-row lg:flex-col py-4 lg:py-6 px-4 lg:px-4 lg:fixed lg:inset-y-0 lg:left-0 lg:h-screen gap-4 lg:gap-0"
        style={{
          background: "var(--color-surface)",
          borderColor: "var(--color-border)",
        }}
      >
        <Link
          href="/dashboard"
          className="text-base lg:text-lg font-bold mb-0 lg:mb-8 px-2 whitespace-nowrap"
        >
          Link<span style={{ color: "var(--color-accent)" }}>Forge</span>
        </Link>

        <nav className="flex-1 space-y-1 flex lg:flex-col gap-2 lg:gap-0">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs lg:text-sm font-medium transition-all hover:bg-white/5 whitespace-nowrap"
            style={{ color: "var(--color-text)" }}
          >
            <LayoutDashboard size={16} />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>
        </nav>

        <div
          className="space-y-2 border-l lg:border-l-0 lg:border-t pl-4 lg:pl-0 lg:pt-4"
          style={{ borderColor: "var(--color-border)" }}
        >
          {profile?.username && (
            <a
              href={`/${profile.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all hover:bg-white/5 whitespace-nowrap"
              style={{ color: "var(--color-muted)" }}
            >
              <ExternalLink size={13} />
              <span className="hidden sm:inline">View my page</span>
            </a>
          )}
          <SignOutButton />
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 lg:ml-56 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
