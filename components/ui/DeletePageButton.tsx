"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Trash2, Loader2 } from "lucide-react";

interface Props {
  pageId: string;
  pageName: string;
}

export default function DeletePageButton({ pageId, pageName }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `هل أنت متأكد من حذف "${pageName}"؟\nسيتم حذف كل الروابط والإحصائيات.`,
    );
    if (!confirmed) return;

    setLoading(true);
    const supabase = createClient();
    await supabase.from("pages").delete().eq("id", pageId);
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-red-500/10 ml-auto disabled:opacity-50"
      style={{ color: "#f76a8f" }}
      title="Delete page"
    >
      {loading ? (
        <Loader2 size={12} className="animate-spin" />
      ) : (
        <Trash2 size={12} />
      )}
      Delete
    </button>
  );
}
