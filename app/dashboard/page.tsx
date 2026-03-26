// import { createClient } from "@/lib/supabase/server";
// import { redirect } from "next/navigation";
// import Link from "next/link";
// import { Plus, ExternalLink, BarChart3, Edit3 } from "lucide-react";
// import type { Page } from "@/types";

// export default async function DashboardPage() {
//   const supabase = await createClient();
//   const {
//     data: { user },
//   } = await supabase.auth.getUser();
//   if (!user) redirect("/auth/login");

//   const { data: profile } = await supabase
//     .from("profiles")
//     .select("username, plan")
//     .eq("id", user.id)
//     .single();

//   const { data: pages } = await supabase
//     .from("pages")
//     .select("*")
//     .eq("user_id", user.id)
//     .order("created_at", { ascending: false });

//   return (
//     <div className="max-w-4xl mx-auto">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-10">
//         <div>
//           <h1
//             className="text-2xl font-bold"
//             style={{ color: "var(--color-text)" }}
//           >
//             My Pages
//           </h1>
//           <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>
//             {profile?.username && (
//               <>
//                 Your link:{" "}
//                 <span style={{ color: "var(--color-accent)" }}>
//                   linkforge.app/{profile.username}
//                 </span>
//               </>
//             )}
//           </p>
//         </div>
//         <Link
//           href="/dashboard/new"
//           className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
//           style={{ background: "var(--color-accent)" }}
//         >
//           <Plus size={16} />
//           New Page
//         </Link>
//       </div>

//       {/* Pages grid */}
//       {!pages || pages.length === 0 ? (
//         <div
//           className="rounded-2xl border border-dashed p-16 text-center"
//           style={{ borderColor: "var(--color-border)" }}
//         >
//           <div
//             className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
//             style={{ background: "var(--color-surface-2)" }}
//           >
//             <Plus size={24} style={{ color: "var(--color-muted)" }} />
//           </div>
//           <p
//             className="font-semibold mb-1"
//             style={{ color: "var(--color-text)" }}
//           >
//             No pages yet
//           </p>
//           <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
//             Create your first bio link page and share it with the world.
//           </p>
//           <Link
//             href="/dashboard/new"
//             className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
//             style={{ background: "var(--color-accent)" }}
//           >
//             <Plus size={15} />
//             Create first page
//           </Link>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {(pages as Page[]).map((page) => (
//             <div
//               key={page.id}
//               className="p-6 rounded-2xl border transition-all hover:-translate-y-0.5"
//               style={{
//                 background: "var(--color-surface)",
//                 borderColor: "var(--color-border)",
//               }}
//             >
//               <div className="flex items-start justify-between mb-4">
//                 <div>
//                   <h2
//                     className="font-semibold"
//                     style={{ color: "var(--color-text)" }}
//                   >
//                     {page.name}
//                   </h2>
//                   {page.bio && (
//                     <p
//                       className="text-xs mt-1 line-clamp-2"
//                       style={{ color: "var(--color-muted)" }}
//                     >
//                       {page.bio}
//                     </p>
//                   )}
//                 </div>
//                 <span
//                   className="text-xs px-2 py-1 rounded-lg capitalize"
//                   style={{
//                     background: "var(--color-surface-2)",
//                     color: "var(--color-muted)",
//                   }}
//                 >
//                   {page.theme}
//                 </span>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Link
//                   href={`/editor/${page.id}`}
//                   className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-white/5"
//                   style={{ color: "var(--color-text)" }}
//                 >
//                   <Edit3 size={12} />
//                   Edit
//                 </Link>
//                 <Link
//                   href={`/analytics/${page.id}`}
//                   className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-white/5"
//                   style={{ color: "var(--color-text)" }}
//                 >
//                   <BarChart3 size={12} />
//                   Analytics
//                 </Link>
//                 {profile?.username && (
//                   <a
//                     href={`/${profile.username}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-white/5 ml-auto"
//                     style={{ color: "var(--color-accent)" }}
//                   >
//                     <ExternalLink size={12} />
//                     View
//                   </a>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, ExternalLink, BarChart3, Edit3, Trash2 } from "lucide-react";
import type { Page } from "@/types";
import DeletePageButton from "@/components/ui/DeletePageButton";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("username, plan")
    .eq("id", user.id)
    .single();

  const { data: pages } = await supabase
    .from("pages")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--color-text)" }}
          >
            My Pages
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>
            {profile?.username && (
              <>
                Your link:{" "}
                <span style={{ color: "var(--color-accent)" }}>
                  linkforge.app/{profile.username}
                </span>
              </>
            )}
          </p>
        </div>
        <Link
          href="/dashboard/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90"
          style={{ background: "var(--color-accent)" }}
        >
          <Plus size={16} />
          New Page
        </Link>
      </div>

      {!pages || pages.length === 0 ? (
        <div
          className="rounded-2xl border border-dashed p-16 text-center"
          style={{ borderColor: "var(--color-border)" }}
        >
          <p
            className="font-semibold mb-1"
            style={{ color: "var(--color-text)" }}
          >
            No pages yet
          </p>
          <p className="text-sm mb-6" style={{ color: "var(--color-muted)" }}>
            Create your first bio link page.
          </p>
          <Link
            href="/dashboard/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
            style={{ background: "var(--color-accent)" }}
          >
            <Plus size={15} />
            Create first page
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(pages as Page[]).map((page) => (
            <div
              key={page.id}
              className="p-6 rounded-2xl border transition-all hover:-translate-y-0.5"
              style={{
                background: "var(--color-surface)",
                borderColor: "var(--color-border)",
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2
                    className="font-semibold"
                    style={{ color: "var(--color-text)" }}
                  >
                    {page.name}
                  </h2>
                  {page.bio && (
                    <p
                      className="text-xs mt-1 line-clamp-2"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {page.bio}
                    </p>
                  )}
                </div>
                <span
                  className="text-xs px-2 py-1 rounded-lg capitalize"
                  style={{
                    background: "var(--color-surface-2)",
                    color: "var(--color-muted)",
                  }}
                >
                  {page.theme}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  href={`/editor/${page.id}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-white/5"
                  style={{ color: "var(--color-text)" }}
                >
                  <Edit3 size={12} />
                  Edit
                </Link>
                <Link
                  href={`/analytics/${page.id}`}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-white/5"
                  style={{ color: "var(--color-text)" }}
                >
                  <BarChart3 size={12} />
                  Analytics
                </Link>
                {profile?.username && (
                  <a
                    href={
                      pages.length === 1
                        ? `/${profile.username}`
                        : `/${profile.username}/${page.id}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:bg-white/5"
                    style={{ color: "var(--color-accent)" }}
                  >
                    <ExternalLink size={12} />
                    View
                  </a>
                )}
                {/* زر الحذف */}
                <DeletePageButton pageId={page.id} pageName={page.name} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
