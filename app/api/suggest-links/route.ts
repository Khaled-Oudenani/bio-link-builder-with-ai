import { NextRequest, NextResponse } from "next/server";
import { generateWithGemini } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { profession } = await req.json();
    if (!profession)
      return NextResponse.json(
        { error: "Missing profession" },
        { status: 400 },
      );

    const text = await generateWithGemini(
      `Suggest 5 relevant bio link buttons for someone who is: "${profession}".
Return ONLY a valid JSON array, no explanation, no markdown, no backticks.
Example: [{"title":"GitHub Portfolio","url":"https://github.com"}]
Return exactly 5 items.`,
    );

    const clean = text.replace(/\`\`\`json|\`\`\`/g, "").trim();
    const links = JSON.parse(clean);
    return NextResponse.json({ links });
  } catch (error) {
    console.error("Suggest links error:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
