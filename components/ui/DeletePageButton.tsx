// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { createClient } from "@/lib/supabase/client";
// import { Trash2, Loader2 } from "lucide-react";

// interface Props {
//   pageId: string;
//   pageName: string;
// }

// export default function DeletePageButton({ pageId, pageName }: Props) {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);

//   async function handleDelete() {
//     const confirmed = window.confirm(
//       `هل أنت متأكد من حذف "${pageName}"؟\nسيتم حذف كل الروابط والإحصائيات.`,
//     );
//     if (!confirmed) return;

//     setLoading(true);
//     const supabase = createClient();
//     await supabase.from("pages").delete().eq("id", pageId);
//     router.refresh();
//   }

//   return (
//     <button
//       onClick={handleDelete}
//       disabled={loading}
//       className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-red-500/10 ml-auto disabled:opacity-50"
//       style={{ color: "#f76a8f" }}
//       title="Delete page"
//     >
//       {loading ? (
//         <Loader2 size={12} className="animate-spin" />
//       ) : (
//         <Trash2 size={12} />
//       )}
//       Delete
//     </button>
//   );
// }

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Trash2, Loader2 } from "lucide-react";

interface Props {
  pageId: string;
  pageName: string;
  fullWidth?: boolean;
}

export default function DeletePageButton({
  pageId,
  pageName,
  fullWidth,
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = window.confirm(
      `حذف "${pageName}"؟\nسيتم حذف كل الروابط والإحصائيات.`,
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
      className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-80 disabled:opacity-50 ${fullWidth ? "w-full" : ""}`}
      style={{ background: "rgba(247,106,143,0.1)", color: "#f76a8f" }}
    >
      {loading ? (
        <Loader2 size={11} className="animate-spin" />
      ) : (
        <Trash2 size={11} />
      )}
      Delete Page
    </button>
  );
}
