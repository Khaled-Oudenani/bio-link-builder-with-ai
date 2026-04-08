// import type { Metadata } from "next";
// import "./globals.css";

// export const metadata: Metadata = {
//   title: "LinkForge — Your Smart Bio Link Page",
//   description:
//     "Create a stunning bio link page in minutes with AI-powered bio generation and real analytics.",
//   verification: {
//     google: "-hYe8HhgEiUgRmmNmoq_vcF0PBDIUYebDDR1hjQ9uRo", // ضع القيمة من Google هنا
//   },
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <head>
//         <meta
//           name="google-site-verification"
//           content="-hYe8HhgEiUgRmmNmoq_vcF0PBDIUYebDDR1hjQ9uRo"
//         />
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link
//           rel="preconnect"
//           href="https://fonts.gstatic.com"
//           crossOrigin="anonymous"
//         />
//         <link
//           href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap"
//           rel="stylesheet"
//         />
//       </head>
//       <body>{children}</body>
//     </html>
//   );
// }
// ////////////////////////////////////////////////////////
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "LinkForge — Smart Bio Link Page Builder",
    template: "%s | LinkForge",
  },
  description:
    "Create a beautiful bio link page in minutes. AI-powered bio generation, real click analytics, and stunning themes. The smartest Linktree alternative.",
  keywords: [
    "bio link",
    "link in bio",
    "linktree alternative",
    "bio link page",
    "link page builder",
    "AI bio generator",
    "social media links",
    "bio link free",
  ],
  authors: [{ name: "LinkForge" }],
  creator: "LinkForge",
  metadataBase: new URL("https://your-project.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bio-link-builder-with-ai.vercel.app/",
    title: "LinkForge — Smart Bio Link Page Builder",
    description:
      "Create a beautiful bio link page in minutes. AI-powered bio generation, real click analytics, and stunning themes.",
    siteName: "LinkForge",
  },
  twitter: {
    card: "summary_large_image",
    title: "LinkForge — Smart Bio Link Page Builder",
    description:
      "Create a beautiful bio link page in minutes. AI-powered bio generation and real analytics.",
    creator: "@linkforge",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "-hYe8HhgEiUgRmmNmoq_vcF0PBDIUYebDDR1hjQ9uRo", // ضع قيمة Google هنا
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
