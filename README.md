# 🚀 AI-Powered PRD Generator

A professional, enterprise-grade Product Requirements Document (PRD) generator that leverages Google's Gemini AI to instantly craft detailed product specifications. Built with a modern tech stack including React 19, Vite, Tailwind CSS 4, and Supabase.

![Project Banner](https://images.unsplash.com/photo-1555421689-4917d7dad20e?q=80&w=2000&auto=format&fit=crop)
*(Replace with actual screenshot of the dashboard)*

## 🌟 Key Features

### 🤖 AI Intelligence via Gemini
- **Smart Generation**: Automatically generates "Product Vision," "Problem Statements," and "Success Metrics" based on minimal input.
- **Context Awareness**: Toggles between **Web** and **Mobile** contexts to tailor the output (e.g., specific mobile gestures vs. web interactions).
- **Credit System**: Implementation of a token-based usage system to manage AI costs, complete with a visual credit balance.

### 📝 5-Step Wizard Workflow
1.  **Project Info**: Basic metadata, status tracking, and platform selection.
2.  **Target Audience**: Define user personas (Primary/Secondary) and generate User Stories.
3.  **Key Features**: List and prioritize features with MoSCoW prioritization support.
4.  **Tech Stack**: Select technologies from a curated list of modern frameworks and tools.
5.  **Preview & Export**: Real-time preview of the generated document.

### 💼 Enterprise-Ready Architecture
- **Authentication**: Robust user management using **Supabase Auth** (Email/Password & Social Logins).
- **Role-Based Access**: Support for different user tiers (Free vs. Pro).
- **Subscription Model**: Integrated "Upgrade" flow with simulated payment gateways including:
    - Credit/Debit Card
    - PayPal
    - M-Pesa (Mobile Money)
    - Stripe Link
    - Bank Transfer
- **Persistent Storage**: All PRDs are saved to **Supabase Database** (Postgres) with local redundancy via `localStorage`.

### 🎨 Modern UI/UX
- **Glassmorphism Design**: Sleek, dark-themed interface with translucent panels and vibrant gradients.
- **Responsive Layout**: Fully responsive dashboard and wizard optimized for all devices.
- **Interactive Components**: Custom `MultiSelect`, `SearchableDropdown`, and animated transitions using `framer-motion` concepts.

### 📤 Export Capabilities
- **PDF Export**: Professional PDF generation using `html2canvas` and `jspdf`.
- **Markdown Export**: Direct download of PRDs in `.md` format for documentation wikis.

---

## 🛠️ Technology Stack

| Category | Technology | Description |
| :--- | :--- | :--- |
| **Frontend** | [React 19](https://react.dev/) | The latest library for building user interfaces. |
| **Build Tool** | [Vite 7](https://vitejs.dev/) | Next-generation frontend tooling. |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS framework for rapid UI development. |
| **Backend / DB** | [Supabase](https://supabase.com/) | Open source Firebase alternative (Postgres + Auth). |
| **State Mgmt** | [Zustand](https://github.com/pmndrs/zustand) | Small, fast, and scalable bearbones state-management. |
| **Routing** | [React Router 7](https://reactrouter.com/) | Declarative routing for React. |
| **AI Model** | [Google Gemini](https://deepmind.google/technologies/gemini/) | Multimodal Generative AI SDK. |
| **Icons** | [Lucide React](https://lucide.dev/) | Beautiful & consistent icons. |

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- Node.js `v18+`
- npm `v9+` or yarn
- A [Supabase](https://supabase.com) account.
- A [Google AI Studio](https://aistudio.google.com/) API Key.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Akubrecah/prd-generator.git
    cd prd-generator
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory:
    ```bash
    cp .env.example .env
    ```
    Then update `.env` with your keys:
    ```env
    VITE_SUPABASE_URL=https://your-project-id.supabase.co
    VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
    VITE_GEMINI_API_KEY=your-google-gemini-key
    ```

4.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🗄️ Database Setup (Supabase)

This project uses a Postgres database managed by Supabase.

1.  Create a new project on Supabase.
2.  Navigate to the **SQL Editor**.
3.  Copy the contents of `supabase/schema.sql` from this repository.
4.  Run the query to creating the necessary tables (`profiles`, `prds`, `payments`) and security policies (RLS).

**Key Tables:**
- `profiles`: Extends the default `auth.users` with application-specific data (tier, credits).
- `prds`: Stores the generated JSON data for each project.
- `payments`: Transaction logs for subscription upgrades.

---

## 📖 Deployment

### Build for Production
```bash
npm run build
```
This generates a `./dist` folder optimized for production.

### Host on Netlify
The project can be easily deployed to Netlify via drag-and-drop or using the CLI:
1.  Run `npm run build`.
2.  Drag the `dist` folder to Netlify Drop.
3.  **Important**: Set your Environment Variables in the Netlify Dashboard (`Site settings > Build & deploy > Environment`).

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👤 Author

**Akubrecah**

- GitHub: [@Akubrecah](https://github.com/Akubrecah)

---

Built with ❤️ for Product Managers and Developers.
