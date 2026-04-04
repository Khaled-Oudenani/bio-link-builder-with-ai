import Link from "next/link";
import { ArrowRight, Zap, BarChart3, Palette, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen" style={{ background: "var(--color-bg)" }}>
      {/* Navbar */}
      <nav
        className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-8 py-4 sm:py-5 border-b gap-3 sm:gap-0"
        style={{ borderColor: "var(--color-border)" }}
      >
        <span
          className="text-lg sm:text-xl font-bold tracking-tight"
          style={{ color: "var(--color-text)" }}
        >
          Link<span style={{ color: "var(--color-accent)" }}>Forge</span>
        </span>
        <div className="flex items-center gap-4">
          <Link
            href="/auth/login"
            className="text-xs sm:text-sm font-medium transition-colors"
            style={{ color: "var(--color-muted)" }}
          >
            Sign In
          </Link>
          <Link
            href="/auth/register"
            className="px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "var(--color-accent)" }}
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 sm:px-8 pt-16 sm:pt-28 pb-16 sm:pb-20 text-center">
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6 sm:mb-8 border"
          style={{
            background: "rgba(124,106,247,0.1)",
            borderColor: "rgba(124,106,247,0.3)",
            color: "var(--color-accent)",
          }}
        >
          <Sparkles size={12} />
          AI-Powered Bio Generation
        </div>

        <h1
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4 sm:mb-6"
          style={{ color: "var(--color-text)" }}
        >
          One link.
          <br />
          <span
            style={{
              background:
                "linear-gradient(135deg, var(--color-accent), var(--color-accent-2))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Everything you are.
          </span>
        </h1>

        <p
          className="text-base sm:text-lg max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2"
          style={{ color: "var(--color-muted)" }}
        >
          Create a beautiful bio link page in minutes. Let AI write your
          professional bio, track who clicks what, and pick a theme that
          actually looks like you.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 hover:scale-105 w-full sm:w-auto justify-center"
            style={{
              background:
                "linear-gradient(135deg, var(--color-accent), var(--color-accent-2))",
            }}
          >
            Create your page — free
            <ArrowRight size={16} />
          </Link>
          <span
            className="text-xs sm:text-sm"
            style={{ color: "var(--color-muted)" }}
          >
            No credit card needed
          </span>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 sm:px-8 pb-16 sm:pb-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        {[
          {
            icon: <Sparkles size={20} />,
            title: "AI Bio Writer",
            desc: "Describe yourself in one sentence. Gemini writes the rest.",
          },
          {
            icon: <BarChart3 size={20} />,
            title: "Real Analytics",
            desc: "See exactly which links get clicked and where visitors come from.",
          },
          {
            icon: <Palette size={20} />,
            title: "Beautiful Themes",
            desc: "4 curated themes that make your page stand out, not blend in.",
          },
          {
            icon: <Zap size={20} />,
            title: "Instant Setup",
            desc: "Go from signup to live page in under 5 minutes.",
          },
        ].map((f, i) => (
          <div
            key={i}
            className="p-5 sm:p-6 rounded-2xl border transition-all hover:-translate-y-1"
            style={{
              background: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
              style={{
                background: "rgba(124,106,247,0.15)",
                color: "var(--color-accent)",
              }}
            >
              {f.icon}
            </div>
            <h3
              className="font-semibold mb-2 text-sm sm:text-base"
              style={{ color: "var(--color-text)" }}
            >
              {f.title}
            </h3>
            <p
              className="text-xs sm:text-sm leading-relaxed"
              style={{ color: "var(--color-muted)" }}
            >
              {f.desc}
            </p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer
        className="border-t px-4 sm:px-8 py-4 sm:py-6 text-center text-xs sm:text-sm"
        style={{
          borderColor: "var(--color-border)",
          color: "var(--color-muted)",
        }}
      >
        © 2026 LinkForge — Built with Next.js & Supabase
      </footer>
    </main>
  );
}
