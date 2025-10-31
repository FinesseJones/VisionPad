This is the readme. File : # VisionPad

> Your personal knowledge vault and command center — combining the best of OneNote, Obsidian, and ClickUp.

![VisionPad Dashboard](https://d64gsuwffb70l.cloudfront.net/6904b7bacb0a54bd1ce7dad4_1761916925482_8a9fe9a1.webp)

## 🚀 Features

### 📚 Knowledge Hub
- **Hierarchical notebook organization** - Organize notes in folders
- **Markdown editor** with live preview
- **Bi-directional links** - Use `[[page]]` syntax to connect ideas
- **Tags system** - Use `#tags` for organization
- **Graph view** - Visualize your knowledge network
- **Quick capture** - Command palette (⌘K) for instant note creation
- **Cloud sync** - Real-time sync across devices with Supabase

### ✅ Task Management
- **Multiple views**: Kanban board, Gantt chart, Spreadsheet, Calendar, List view
- **Gantt chart** - Visualize project timelines
- **Spreadsheet view** - Excel/Google Sheets-like data management
- **Task CRUD** with priorities and due dates
- **Project boards** tied to notes
- **Daily planner** with quick task creation
- **Progress tracking** with analytics
- **Cloud sync** - Tasks sync across all your devices


### 🤖 AI Features
- **Note summarization** - Get concise summaries of your notes
- **Content rewriting** - Improve clarity and readability
- **Content expansion** - Add more details to your ideas
- **Smart linking** - AI-suggested connections between notes
- **Natural language search** - Find notes using conversational queries

### 🔐 Authentication & Security
- **Email/Password authentication** - Secure account creation
- **OAuth providers** - Sign in with Google or GitHub
- **Protected routes** - Secure access to your data
- **Session management** - Persistent login across sessions
- **Password reset** - Easy account recovery
- **User profiles** - Manage your account settings
- **Admin dashboard** - User management for administrators
- **Role-based access control** - Admin and user roles
- **Row Level Security** - Your data is isolated and secure


### 🎨 Beautiful UI
- **Dark/Light mode** toggle
- **Glassmorphic design** with smooth animations
- **Split-pane workspace** - Resizable panels
- **Command palette** - Keyboard-first workflow
- **Responsive design** - Works on all screen sizes

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: React Context API
- **Backend**: Supabase (PostgreSQL + Auth + Edge Functions)
- **AI**: OpenAI GPT-4o-mini
- **Build Tool**: Vite

## 📦 Installation

\`\`\`bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your Supabase credentials to .env

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
\`\`\`

## 🔧 Configuration

### Supabase Setup
1. Create a Supabase project at https://supabase.com
2. Copy your project URL and anon key to `.env`
3. Database tables are auto-created on first run
4. Enable OAuth providers in Supabase dashboard (optional)

### OAuth Providers (Optional)
To enable Google/GitHub sign-in:
1. Go to Supabase Dashboard → Authentication → Providers
2. Enable Google and/or GitHub
3. Add OAuth credentials from provider consoles
4. Set redirect URLs to your app domain

## 🎯 Usage

### Getting Started
1. Sign up for an account or use OAuth
2. Create your first note
3. Start organizing with folders and tags
4. Link notes together with `[[note title]]`
5. Use AI features to enhance your content

### Keyboard Shortcuts
- `⌘K` / `Ctrl+K` - Open command palette
- Create notes, tasks, and search from anywhere

### AI Assistant
1. Select the AI tab in the right panel
2. Choose an action (Summarize, Rewrite, Expand, Suggest Links)
3. Review the AI-generated content
4. Apply to your note with one click

## 🗺️ Roadmap

- [x] Cloud sync (Supabase integration)
- [x] AI-powered note features
- [x] User authentication
- [x] Admin dashboard
- [x] Gantt chart visualization
- [x] Spreadsheet view
- [ ] Advanced graph filters
- [ ] Plugin system
- [ ] Mobile app (React Native)
- [ ] Desktop app (Electron)
- [ ] Collaborative editing
- [ ] Version history
- [ ] Habit tracker


## 📄 License

MIT License - feel free to use this for your own projects!

---

Built with ❤️ for knowledge workers and productivity enthusiasts.
