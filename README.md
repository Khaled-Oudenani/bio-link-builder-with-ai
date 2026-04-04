# LinkForge — Smart Bio Link Page Builder

A modern, AI-powered bio link page builder that allows users to create beautiful, customizable link landing pages with advanced analytics and intelligent features.

**LinkForge** combines the power of Next.js, Supabase, and Google's Gemini AI to deliver a seamless experience for creating and managing bio link pages with real-time analytics and AI-assisted content generation.

---

## ✨ Features

- **AI-Powered Bio Generation** — Automatically generate compelling bio descriptions using Gemini AI
- **Intelligent Link Suggestions** — Get AI-powered recommendations for links to add to your page
- **Drag-and-Drop Editor** — Easily organize and customize your links with an intuitive drag-and-drop interface
- **Real-Time Analytics** — Track clicks on your links with detailed analytics dashboards
- **Customizable Design** — Full control over colors, fonts, and layout to match your brand
- **Public Link Sharing** — Generate shareable URLs for your bio link pages
- **Authentication** — Secure user accounts with Supabase Auth
- **Responsive Design** — Optimized for all devices (mobile, tablet, desktop)

---

## 🛠️ Tech Stack

| Technology          | Purpose                                               |
| ------------------- | ----------------------------------------------------- |
| **Next.js 15**      | React framework with server components and API routes |
| **Supabase**        | PostgreSQL database and authentication                |
| **Gemini AI**       | AI-powered content generation                         |
| **TypeScript**      | Type-safe development                                 |
| **Tailwind CSS v4** | Utility-first styling                                 |
| **dnd-kit**         | Drag-and-drop functionality                           |
| **Recharts**        | Analytics visualization                               |
| **Zod**             | Schema validation                                     |

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js** 18.17 or later
- **npm** or **yarn** package manager
- A **Supabase** account ([supabase.com](https://supabase.com))
- A **Google Gemini API key** ([aistudio.google.com](https://aistudio.google.com))

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd bio-link-builder
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Open the **SQL Editor** in your Supabase dashboard
3. Copy and paste the contents of `supabase-schema.sql`
4. Execute the SQL to set up your database schema
5. Go to **Project Settings → API** and copy the following credentials:
   - **Project URL** (e.g., `https://xxxx.supabase.co`)
   - **Anon Public Key** (for client-side requests)
   - **Service Role Key** (keep this secret — server-side only)

### 4. Get Gemini API Key

1. Visit [aistudio.google.com](https://aistudio.google.com)
2. Click **Get API Key**
3. Create a new API key for this project
4. Copy and save the key securely

### 5. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Fill in the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Gemini AI Configuration
GEMINI_API_KEY=AIza...

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The application will auto-reload as you make changes.

---

## 📁 Project Structure

```
bio-link-builder/
├── app/                           # Next.js App Router
│   ├── auth/                      # Authentication pages (login, register)
│   ├── dashboard/                 # User dashboard
│   ├── editor/                    # Bio link editor
│   ├── analytics/                 # Analytics dashboard
│   ├── api/                       # API routes
│   │   ├── generate-bio/          # AI bio generation
│   │   ├── suggest-links/         # AI link suggestions
│   │   └── track-click/           # Click tracking
│   └── [username]/                # Public bio link pages
│
├── components/                    # Reusable React components
│   ├── editor/                    # Editor components (AI tools, link editor)
│   ├── analytics/                 # Analytics visualization
│   ├── preview/                   # Preview components
│   └── ui/                        # UI utilities
│
├── lib/                           # Utility functions
│   ├── supabase/                  # Supabase clients (server/client)
│   ├── gemini.ts                  # Gemini AI integration
│   └── utils.ts                   # Helper functions
│
├── types/                         # TypeScript type definitions
└── middleware.ts                  # Next.js middleware for routing

```

---

## 🔑 Key Features Explained

### AI Bio Generator

The **AiBioGenerator** component uses Google's Gemini AI to automatically create compelling bio descriptions. Simply provide your profession or interests, and the AI generates multiple options.

**Endpoint:** `POST /api/generate-bio`

### AI Link Suggester

The **AiLinkSuggester** component analyzes your bio and suggests relevant links you might want to add.

**Endpoint:** `POST /api/suggest-links`

### Link Analytics

Track every click on your bio links with detailed analytics showing:

- Click-through rates
- Popular links
- Traffic patterns over time
- Device and browser information

**Endpoint:** `POST /api/track-click`

### Drag-and-Drop Editor

Powered by **dnd-kit**, the editor provides a smooth drag-and-drop experience for organizing your links without limitations.

---

## 🔐 Authentication

LinkForge uses **Supabase Auth** for secure user authentication:

- **Sign Up:** Users create accounts with email and password
- **Sign In:** Secure login with session management
- **Sign Out:** Automatic session cleanup
- **Protected Routes:** Dashboard and editor require authentication

---

## 📊 Database Schema

The application uses the following main tables:

- **users** — User accounts (managed by Supabase Auth)
- **profiles** — User profile information (username, settings)
- **pages** — Bio link pages
- **links** — Links on each page
- **analytics** — Click tracking data

See `supabase-schema.sql` for the complete schema.

---

## 🛣️ API Routes

| Route                | Method | Purpose                            |
| -------------------- | ------ | ---------------------------------- |
| `/api/generate-bio`  | POST   | Generate bio descriptions using AI |
| `/api/suggest-links` | POST   | Get AI link suggestions            |
| `/api/track-click`   | POST   | Track link clicks for analytics    |

---

## 📦 Available Scripts

```bash
# Development
npm run dev              # Start development server

# Production
npm run build            # Build for production
npm start                # Start production server

# Linting
npm run lint             # Run ESLint
```

---

## 🚢 Deployment

### Deployment to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy

```bash
# Environment variables to add in Vercel:
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
GEMINI_API_KEY=...
NEXT_PUBLIC_APP_URL=https://yourdomain.com
```

### Other Deployment Options

- **Docker** — See Dockerfile if available
- **Self-Hosted** — Deploy to any Node.js-compatible hosting

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to your branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License. See the **LICENSE** file for details.

---

## 🆘 Support & Troubleshooting

### Issue: "Cannot find Supabase project"

- Verify your `NEXT_PUBLIC_SUPABASE_URL` is correct
- Ensure the Supabase project is active

### Issue: "Gemini API key invalid"

- Check that your `GEMINI_API_KEY` is correctly set
- Verify the API key has the appropriate permissions

### Issue: "Database migrations not applied"

- Run the SQL from `supabase-schema.sql` in your Supabase SQL editor
- Ensure all tables are created successfully

For more help, check the [Next.js Documentation](https://nextjs.org/docs) or [Supabase Documentation](https://supabase.com/docs).

---

## 🙏 Acknowledgments

- Built with [Next.js 15](https://nextjs.org)
- Database powered by [Supabase](https://supabase.com)
- AI powered by [Google Gemini](https://ai.google.dev)
- Styling with [Tailwind CSS](https://tailwindcss.com)
- Icons from [Lucide React](https://lucide.dev)

---

**Happy link building! 🚀**

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

| Theme      | Style                       |
| ---------- | --------------------------- |
| `default`  | Clean white, purple accents |
| `dark`     | Midnight black, neon green  |
| `gradient` | Deep space, pink accents    |
| `minimal`  | Pure white, black text      |

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
