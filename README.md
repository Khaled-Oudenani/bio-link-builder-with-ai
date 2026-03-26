# LinkForge — Smart Bio Link Page Builder

Built with **Next.js 15**, **Supabase**, **Gemini AI**, and **Tailwind v4**.

---

## ⚙️ Setup Guide

### 1. Install dependencies

```bash
npm install
```

---

### 2. Create Supabase project

1. Go to [supabase.com](https://supabase.com) → New Project
2. Open **SQL Editor** and paste the entire contents of `supabase-schema.sql` → Run
3. Go to **Project Settings → API** and copy:
   - `Project URL`
   - `anon public` key
   - `service_role` key (keep this secret!)

---

### 3. Get Gemini API key

1. Go to [aistudio.google.com](https://aistudio.google.com)
2. Click **Get API Key** → Create API key
3. Copy the key

---

### 4. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
GEMINI_API_KEY=AIza...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

### 6. Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Add all environment variables in **Vercel Dashboard → Project → Settings → Environment Variables**.

Change `NEXT_PUBLIC_APP_URL` to your production URL.

---

## 📁 Project Structure

```
app/
├── page.tsx                    # Landing page
├── auth/login/                 # Login
├── auth/register/              # Register (2-step with username)
├── dashboard/                  # My pages list
├── dashboard/new/              # Create new page
├── editor/[pageId]/            # Page editor
├── analytics/[pageId]/         # Analytics dashboard
├── [username]/                 # Public bio page
├── api/generate-bio/           # Gemini API route
└── api/track-click/            # Click tracking

components/
├── editor/EditorClient.tsx     # Main editor UI
├── editor/SortableLinkCard.tsx # Drag & drop link card
├── editor/AiBioGenerator.tsx   # AI bio widget
├── preview/PagePreview.tsx     # Editor sidebar preview
├── preview/PublicPageClient.tsx# Public-facing page
└── analytics/AnalyticsClient.tsx # Charts & stats

lib/
├── supabase/client.ts          # Browser Supabase client
├── supabase/server.ts          # Server Supabase client
├── gemini.ts                   # Gemini AI helper
└── utils.ts                    # cn(), validators
```

---

## 🎨 Themes

| Theme | Style |
|---|---|
| `default` | Clean white, purple accents |
| `dark` | Midnight black, neon green |
| `gradient` | Deep space, pink accents |
| `minimal` | Pure white, black text |

---

## 💡 Features

- ✅ Auth (email/password via Supabase)
- ✅ Username selection at signup
- ✅ Create & manage bio pages
- ✅ Add/edit/delete links
- ✅ Drag & drop link ordering
- ✅ Show/hide individual links
- ✅ AI bio generation (Gemini)
- ✅ Live preview in editor
- ✅ 4 beautiful themes
- ✅ Public page at `/username`
- ✅ Click tracking (analytics)
- ✅ Charts: clicks over time + by link
