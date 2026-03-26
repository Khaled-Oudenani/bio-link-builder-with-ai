// import { GoogleGenerativeAI } from "@google/generative-ai";

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// export async function generateBio(userInput: string): Promise<string> {
//   const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//   const prompt = `
// You are a professional bio writer. Write a short, punchy professional bio (maximum 2 sentences, around 30 words) for someone who describes themselves as:
// "${userInput}"

// Rules:
// - Write in third person
// - Be specific and confident
// - No fluff words like "passionate" or "dedicated"
// - Return ONLY the bio text, nothing else
//   `.trim();

//   const result = await model.generateContent(prompt);
//   return result.response.text().trim();
// }

// export async function generateBio(userInput: string): Promise<string> {
//   const response = await fetch(
//     "https://openrouter.ai/api/v1/chat/completions",
//     {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
//       },
//       body: JSON.stringify({
//         model: "google/gemma-3-4b-it:free",
//         messages: [
//           {
//             role: "user",
//             content: `Write a short professional bio (max 2 sentences) for: "${userInput}". Third person. Return ONLY the bio text.`,
//           },
//         ],
//       }),
//     },
//   );

//   const data = await response.json();
//   console.log("OpenRouter response:", JSON.stringify(data, null, 2));
//   return data.choices[0].message.content.trim();
// }

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const MODEL = "gemini-2.5-flash";

export async function generateWithGemini(prompt: string): Promise<string> {
  const model = genAI.getGenerativeModel({ model: MODEL });
  const result = await model.generateContent(prompt);
  return result.response.text().trim();
}

export async function generateBio(userInput: string): Promise<string> {
  return generateWithGemini(
    `
You are a professional bio writer. Write a short, punchy professional bio (maximum 2 sentences, around 30 words) for someone who describes themselves as:
"${userInput}"

Rules:
- Write in third person
- Be specific and confident
- No fluff words like "passionate" or "dedicated"
- Return ONLY the bio text, nothing else
  `.trim(),
  );
}
