# PRD Generator

A modern, AI-powered Product Requirements Document (PRD) generator built with React, Vite, and Supabase.

![PRD Generator](https://img.shields.io/badge/React-19-blue) ![Vite](https://img.shields.io/badge/Vite-7-purple) ![Supabase](https://img.shields.io/badge/Supabase-Ready-green) ![Tailwind](https://img.shields.io/badge/Tailwind-4-cyan)

## ✨ Features

- **AI-Powered Generation**: Use Google Gemini AI to generate product visions, problem statements, and more
- **5-Step Wizard**: Intuitive step-by-step PRD creation process
- **Subscription Tiers**: Free and Pro tiers with credit-based AI usage
- **Multiple Payment Methods**: Credit Card, PayPal, M-Pesa, Stripe Link, and Bank Transfer
- **Project History**: Save and manage multiple PRDs
- **Export Options**: Download as PDF or Markdown
- **Supabase Integration**: Authentication and cloud storage
- **Beautiful UI**: Glassmorphism design with dark theme and animations

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (optional, for cloud features)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/prd-generator.git
cd prd-generator

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file with:

```env
# Supabase (optional - app works in demo mode without these)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Google AI (optional - for AI features)
VITE_GEMINI_API_KEY=your-gemini-api-key
```

## 🏗️ Project Structure

```
prd-generator/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── steps/         # Wizard step components
│   │   ├── FormFields.jsx
│   │   ├── Layout.jsx
│   │   ├── PaymentModal.jsx
│   │   └── ...
│   ├── lib/
│   │   └── supabase.js    # Supabase client
│   ├── pages/             # Route pages
│   │   ├── Dashboard.jsx
│   │   ├── Landing.jsx
│   │   ├── Login.jsx
│   │   └── Pricing.jsx
│   ├── store/
│   │   └── index.js       # Zustand state management
│   ├── App.jsx
│   └── main.jsx
├── supabase/
│   └── schema.sql         # Database schema
├── public/
├── .env.example
└── package.json
```

## 🗄️ Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run `supabase/schema.sql`
3. Copy your project URL and anon key to `.env`
4. Enable Email Auth in Authentication settings

## 🎨 Tech Stack

- **Frontend**: React 19, Vite 7
- **Styling**: Tailwind CSS 4
- **State**: Zustand with persistence
- **Routing**: React Router 7
- **Backend**: Supabase (Auth, Database, Storage)
- **AI**: Google Generative AI (Gemini)
- **Icons**: Lucide React
- **PDF**: html2canvas, jsPDF

## 📝 Subscription Tiers

| Feature | Free | Pro |
|---------|------|-----|
| Credits | 5,000 | 50,000 |
| AI Generation | ✓ | ✓ |
| Sample Data | ✗ | ✓ |
| Markdown Export | ✗ | ✓ |
| Priority Support | ✗ | ✓ |

## 🛠️ Development

```bash
# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📄 License

MIT License - feel free to use this for your own projects!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using React and Supabase
