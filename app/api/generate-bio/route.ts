import { NextRequest, NextResponse } from "next/server";
import { generateBio } from "@/lib/gemini";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }
    const bio = await generateBio(prompt);
    return NextResponse.json({ bio });
  } catch (error) {
    console.error("Gemini error:", error);
    return NextResponse.json({ error: "Failed to generate bio" }, { status: 500 });
  }
}
