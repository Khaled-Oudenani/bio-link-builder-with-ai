"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LogOut, X } from "lucide-react";

export default function SignOutButton() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/auth/login");
    router.refresh();
  }

  const modal = open ? (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="relative w-full max-w-sm p-6 rounded-2xl border shadow-2xl animate-fade-up"
        style={{
          background: "var(--color-surface)",
          borderColor: "var(--color-border)",
        }}
      >
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{ background: "rgba(247,106,143,0.12)" }}
        >
          <LogOut size={24} style={{ color: "#f76a8f" }} />
        </div>

        <h2
          className="text-lg font-bold text-center mb-2"
          style={{ color: "var(--color-text)" }}
        >
          Sign out?
        </h2>
        <p
          className="text-sm text-center mb-6"
          style={{ color: "var(--color-muted)" }}
        >
          You will be redirected to the login page.
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => setOpen(false)}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all hover:bg-white/5"
            style={{
              borderColor: "var(--color-border)",
              color: "var(--color-muted)",
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSignOut}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
            style={{ background: "#f76a8f" }}
          >
            Sign out
          </button>
        </div>

        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg transition-all hover:bg-white/5"
          style={{ color: "var(--color-muted)" }}
        >
          <X size={14} />
        </button>
      </div>
    </div>
  ) : null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs transition-all hover:bg-white/5"
        style={{ color: "var(--color-muted)" }}
      >
        <LogOut size={13} />
        Sign out
      </button>

      {typeof window !== "undefined" && createPortal(modal, document.body)}
    </>
  );
}
