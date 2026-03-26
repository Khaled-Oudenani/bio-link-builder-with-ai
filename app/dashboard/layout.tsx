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
      className="min-h-screen flex"
      style={{ background: "var(--color-bg)" }}
    >
      {/* Sidebar */}
      <aside
        className="w-56 border-r flex flex-col py-6 px-4 fixed h-full"
        style={{
          background: "var(--color-surface)",
          borderColor: "var(--color-border)",
        }}
      >
        <Link href="/dashboard" className="text-lg font-bold mb-8 px-2">
          Link<span style={{ color: "var(--color-accent)" }}>Forge</span>
        </Link>

        <nav className="flex-1 space-y-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
            style={{ color: "var(--color-text)" }}
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
        </nav>

        <div
          className="space-y-2 border-t pt-4"
          style={{ borderColor: "var(--color-border)" }}
        >
          {profile?.username && (
            <a
              href={`/${profile.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all hover:bg-white/5"
              style={{ color: "var(--color-muted)" }}
            >
              <ExternalLink size={13} />
              View my page
            </a>
          )}
          {/* <form action="/auth/signout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all hover:bg-white/5"
              style={{ color: "var(--color-muted)" }}
            >
              <LogOut size={13} />
              Sign out
            </button>
          </form> */}
          <SignOutButton />
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-56 p-8">{children}</main>
    </div>
  );
}
