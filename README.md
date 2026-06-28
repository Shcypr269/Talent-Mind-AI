# TalentMind AI 🧠✨

> **AI-powered hiring intelligence platform that understands talent beyond keywords.**

TalentMind AI is a world-class SaaS frontend for an AI-powered hiring intelligence platform. Built for hackathons and production demos, it features a premium dark-first design inspired by Linear, Vercel, Ashby, Greenhouse, and LinkedIn Recruiter.

---

## 🚀 Quick Start

```bash
# 1. Navigate to the frontend directory
cd challenge_ai_hiring/ui/frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npx next dev
```

The app will be available at **http://localhost:3000** (or the next available port).

---

## 📸 Pages & Features

### 🏠 Landing Page (`/`)
- Animated particle network background
- Scroll-based parallax hero section
- Floating cards (Candidate Score, Behavioral Analysis, AI Insights)
- 6 feature cards with gradient icons and hover effects
- Stats section (100K+ Candidates, 99.9% Accuracy, etc.)
- CTA section with gradient backgrounds
- Scroll indicator animation

### 🎮 Interactive Demo (`/demo`)
- Standalone demo page with particle network
- 3 feature highlights (Smart Rankings, Behavioral AI, Talent Intelligence)
- Quick links to Dashboard and Rankings

### 📊 Executive Dashboard (`/dashboard`)
- 4 animated KPI cards with gradient icons
- Animated counters (100K+ Total Candidates, Top Matches, etc.)
- AI-powered Recruiter Insights (3 insight cards)
- Hiring Funnel visualization with Recharts bar chart
- Funnel Summary panel with conversion rate

### 🔍 Job Analysis (`/job-analysis`)
- Role Summary with AI-generated description
- Required Skills with confidence badges
- Preferred Skills with purple-themed badges
- Behavioral Traits with progress bars
- Hiring Priorities list with animations

### 🏆 Candidate Rankings (`/ranking`)
- 8 candidates with diverse profiles
- Medal icons for Top 3 (#1 Gold, #2 Silver, #3 Bronze)
- Animated progress bars for Fit Score
- Skills column with overflow indicators
- 5 filter categories (Skills, Experience, Industry, Behavior, Location)
- 4 sort options (Highest Fit, Growth, Leadership, Most Active)
- Gold gradient highlight for #1 ranked candidate
- Row animations on load

### 👤 Candidate Detail (`/candidate/[id]`)
- LinkedIn Recruiter-style profile card
- AI-generated recruiter summary
- Quick Stats with Score Rings (Fit, Behavior, Growth, Activity)
- 4-tab detailed analysis:
  - **Behavioral Analysis**: Radar chart with 7 dimensions + explanation cards
  - **Career Trajectory**: Timeline with promotion velocity, growth potential, career momentum
  - **AI Explainability**: Why this candidate, Strengths, Concerns, Missing Skills
  - **Recruiter Notes**: Actionable insights

### 🤖 AI Recruiter Copilot (`/ai-copilot`)
- ChatGPT-like conversational interface
- 4 predefined questions
- Streaming response simulation
- User/AI message bubbles with avatars
- Loading spinner during response generation

### 📈 Advanced Analytics (`/analytics`)
- Skill Distribution bar chart
- Industry Distribution pie chart
- Behavior Distribution line chart
- Growth Potential Distribution bar chart
- Interactive Recharts with dark theme tooltips

### 📤 Submission Center (`/submission`)
- CSV file upload with drag-and-drop zone
- Validation progress bar
- "Ready for Submission" success state
- Leaderboard preview with download button
- Finalize submission button

### ⚙️ Settings (`/settings`)
- Organization Name & Contact Email inputs
- Dark Mode toggle
- AI Ranking Algorithm selector (3 models)
- AI Explainability toggle
- Copilot Proactive Suggestions toggle

---

## 🎨 Design System

### Theme
- **Background**: `#09090B` (dark)
- **Cards**: `#111113`
- **Borders**: Subtle glassmorphism (`rgba(255,255,255,0.06)`)
- **Accent**: Electric Blue (`#3B82F6`), Purple (`#8B5CF6`), Cyan (`#06B6D4`)
- **Typography**: Inter font family

### Components
- **Buttons**: Gradient (blue→purple), Outline, Ghost, Gold variants
- **Badges**: Color-coded by context (blue=skills, purple=preferred, green=strengths, red=concerns)
- **Cards**: Dark with subtle borders, hover lift effects
- **Progress Bars**: Animated with gradient fills
- **Score Rings**: Circular progress indicators
- **Avatars**: DiceBear generated initials

### Animations (Framer Motion)
- Page transitions (fade + slide)
- Card hover effects (scale, lift)
- Animated counters
- Scroll-triggered fade-ins
- Leaderboard row animations
- Chart animations
- Loading shimmer effects
- Floating card animations

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **Recharts** | Data visualizations |
| **Lucide React** | Icon library |
| **Radix UI** | Accessible UI primitives |

### Key Dependencies
```json
{
  "framer-motion": "^12.42.0",
  "lucide-react": "^1.21.0",
  "next": "16.2.9",
  "react": "19.2.4",
  "recharts": "^3.9.0",
  "tailwindcss": "^4"
}
```

---

## 📁 Project Structure

```
challenge_ai_hiring/ui/frontend/
├── app/
│   ├── layout.tsx              # Root layout with AnimatePresence
│   ├── main-layout.tsx         # Sidebar + Top Navigation layout
│   ├── globals.css             # Global styles, themes, animations
│   ├── page.tsx                # Landing page
│   ├── demo/page.tsx           # Interactive demo
│   ├── dashboard/page.tsx      # Executive dashboard
│   ├── job-analysis/page.tsx   # Job analysis
│   ├── ranking/page.tsx        # Candidate rankings
│   ├── candidate/[id]/page.tsx # Candidate detail
│   ├── ai-copilot/page.tsx     # AI Recruiter Copilot
│   ├── analytics/page.tsx      # Advanced analytics
│   ├── submission/page.tsx     # Submission center
│   └── settings/page.tsx       # Settings
├── components/
│   ├── ui/                     # Shadcn-style UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── progress.tsx
│   │   ├── avatar.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── switch.tsx
│   │   ├── select.tsx
│   │   ├── tabs.tsx
│   │   ├── separator.tsx
│   │   ├── tooltip.tsx
│   │   ├── scroll-area.tsx
│   │   └── toggle.tsx
│   ├── particle-network.tsx    # Animated particle background
│   ├── animated-counter.tsx    # Number counter animation
│   ├── score-ring.tsx          # Circular score indicator
│   └── page-transition.tsx     # Page transition wrapper
├── lib/
│   ├── utils.ts                # cn() helper, formatNumber()
│   └── data.ts                 # Mock data
└── package.json
```

---

## 🌐 API Integration

The frontend is designed to connect to a backend API. The mock data in `lib/data.ts` and inline in pages can be replaced with real API calls. Key integration points:

- **Ranking data**: Replace `candidatesData` in `/ranking/page.tsx`
- **Candidate profiles**: Replace `candidatesData` in `/candidate/[id]/page.tsx`
- **Job analysis**: Replace `roleData` in `/job-analysis/page.tsx`
- **AI Copilot**: Replace simulated responses with actual API calls
- **Analytics**: Replace chart data with API responses
- **Submission**: Replace simulated validation with real file processing

---

## 🏗️ Build & Deploy

```bash
# Production build
npx next build

# Start production server
npx next start

# Export static site
npx next export
```

---

## 🎯 Design Philosophy

This frontend was built with the following principles:

1. **Premium & Executive-grade**: Every pixel is intentional. The design communicates intelligence, trust, and sophistication.
2. **Recruiter-focused**: High information density with clear hierarchy. Key data is always accessible.
3. **Minimal but powerful**: No clutter. Every element serves a purpose.
4. **Beautiful animations**: Motion is used to guide attention and create delight, not for decoration.
5. **Production quality**: The UI should feel like a venture-backed AI recruiting startup product.

---

## 📝 License

MIT License - feel free to use for hackathons, demos, and production projects.

---

## 🙏 Acknowledgments

- Design inspiration from Linear, Vercel, Ashby, Greenhouse, LinkedIn Recruiter, Eightfold AI, and Stripe Dashboard
- Built with Next.js, Tailwind CSS, Framer Motion, and Recharts
- Icons by Lucide
- Avatars by DiceBear