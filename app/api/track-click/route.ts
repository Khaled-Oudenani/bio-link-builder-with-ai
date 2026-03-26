// import { NextRequest, NextResponse } from "next/server";
// import { createClient } from "@/lib/supabase/server";

// export async function POST(req: NextRequest) {
//   try {
//     const { link_id, page_id } = await req.json();
//     if (!link_id || !page_id) {
//       return NextResponse.json({ error: "Missing fields" }, { status: 400 });
//     }
//     const supabase = await createClient();
//     const referrer = req.headers.get("referer") || null;
//     await supabase.from("clicks").insert({ link_id, page_id, referrer });
//     return NextResponse.json({ ok: true });
//   } catch (error) {
//     console.error("Click tracking error:", error);
//     return NextResponse.json({ error: "Failed" }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const { link_id, page_id } = await req.json();
    if (!link_id || !page_id)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const supabase = await createClient();
    const referrer = req.headers.get("referer") || null;

    // استخراج الدولة من Vercel header (يشتغل على Vercel تلقائياً)
    const country =
      req.headers.get("x-vercel-ip-country") ||
      req.headers.get("cf-ipcountry") ||
      "Unknown";

    await supabase
      .from("clicks")
      .insert({ link_id, page_id, referrer, country });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Click tracking error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
