# VisionPad Architecture

## 🏗️ Project Structure

\`\`\`
visionpad/
├── src/
│   ├── components/          # React components
│   │   ├── AppLayout.tsx    # Main layout wrapper
│   │   ├── TopNav.tsx       # Navigation bar with auth
│   │   ├── Sidebar.tsx      # Left sidebar
│   │   ├── RightPanel.tsx   # Right panel (graph/tasks/AI)
│   │   ├── Dashboard.tsx    # Dashboard view
│   │   ├── MarkdownEditor.tsx
│   │   ├── KanbanBoard.tsx
│   │   ├── CalendarView.tsx
│   │   ├── TaskList.tsx
│   │   ├── FullGraphView.tsx
│   │   ├── CommandPalette.tsx
│   │   ├── GraphView.tsx
│   │   ├── TasksSidebar.tsx
│   │   ├── AIAssistant.tsx  # AI features panel
│   │   └── ProtectedRoute.tsx # Auth guard
│   ├── contexts/            # React Context providers
│   │   ├── AppContext.tsx   # UI state management
│   │   ├── AuthContext.tsx  # Authentication
│   │   ├── NotesContext.tsx # Notes CRUD + Supabase
│   │   ├── TasksContext.tsx # Tasks CRUD + Supabase
│   │   └── ThemeContext.tsx # Theme management
│   ├── pages/               # Route pages
│   │   ├── Index.tsx        # Main app
│   │   ├── Login.tsx        # Login page
│   │   ├── Signup.tsx       # Signup page
│   │   ├── ForgotPassword.tsx
│   │   ├── Profile.tsx      # User profile
│   │   └── NotFound.tsx
│   ├── lib/                 # External integrations
│   │   └── supabase.ts      # Supabase client
│   ├── types/               # TypeScript definitions
│   │   └── index.ts
│   └── utils/               # Helper functions
│       ├── markdown.ts      # Markdown parsing
│       └── sampleData.ts    # Initial data
├── public/                  # Static assets
└── README.md
\`\`\`

## 🔄 Data Flow

### Authentication Flow
1. **AuthContext** manages user session with Supabase Auth
2. Protected routes check authentication status
3. Session persisted across page refreshes
4. OAuth providers (Google, GitHub) supported
5. Password reset via email

### Notes Management
1. **NotesContext** manages all note state
2. Supabase PostgreSQL for cloud storage
3. Real-time sync across devices
4. Row Level Security ensures user data isolation
5. Markdown parsing extracts links and tags
6. Graph view computed from note connections

### Task Management
1. **TasksContext** manages all task state
2. Supabase PostgreSQL for cloud storage
3. Real-time sync across devices
4. Multiple views (Kanban, Calendar, List) read from same state
5. Status updates trigger re-renders across views

### AI Features
1. **AIAssistant** component in right panel
2. Supabase Edge Functions handle OpenAI API calls
3. Server-side API key management (secure)
4. Actions: summarize, rewrite, expand, suggest-links
5. Results can be applied directly to notes

### Theme Management
1. **ThemeContext** manages dark/light mode
2. Persisted to localStorage
3. CSS classes applied to document root
4. Tailwind dark: variants handle styling

## 🗄️ Database Schema

### profiles
- id (UUID, FK to auth.users)
- email (TEXT)
- full_name (TEXT)
- avatar_url (TEXT)
- created_at, updated_at

### notebooks
- id (UUID)
- user_id (UUID, FK to auth.users)
- title (TEXT)
- parent_id (UUID, FK to notebooks)
- created_at, updated_at

### notes
- id (UUID)
- user_id (UUID, FK to auth.users)
- notebook_id (UUID, FK to notebooks)
- title (TEXT)
- content (TEXT)
- tags (TEXT[])
- links (TEXT[])
- is_favorite (BOOLEAN)
- created_at, updated_at

### tasks
- id (UUID)
- user_id (UUID, FK to auth.users)
- note_id (UUID, FK to notes)
- title (TEXT)
- description (TEXT)
- status (TEXT)
- priority (TEXT)
- due_date (TIMESTAMP)
- completed_at (TIMESTAMP)
- tags (TEXT[])
- created_at, updated_at

## 🎨 Design Patterns

### Context + Hooks Pattern
- Each domain (auth, notes, tasks, theme) has its own context
- Custom hooks (`useAuth`, `useNotes`, `useTasks`) provide type-safe access
- Prevents prop drilling
- Easy to test and maintain

### View Composition
- Main views are separate components
- AppLayout orchestrates which view to show
- Each view is self-contained and can be lazy-loaded

### Cloud-First Architecture
- All data stored in Supabase PostgreSQL
- Real-time sync across devices
- Row Level Security (RLS) for data isolation
- Offline support via browser caching (future)

### Secure API Pattern
- Sensitive API calls handled by Edge Functions
- API keys stored server-side only
- CORS headers configured properly
- User authentication verified on backend

## 🔐 Security Features

1. **Authentication**: Supabase Auth with email/password + OAuth
2. **Row Level Security**: Database policies enforce user isolation
3. **Protected Routes**: Client-side route guards
4. **API Security**: Edge Functions handle sensitive operations
5. **XSS Prevention**: Markdown sanitized before rendering
6. **Session Management**: Secure token handling

## 🚀 Performance Optimizations

1. **Lazy Loading**: Views loaded on demand
2. **Memoization**: Expensive computations cached
3. **Database Indexes**: Optimized queries
4. **Edge Functions**: Low-latency serverless compute
5. **Code Splitting**: Separate bundles per view

## 📱 Future Enhancements

### Advanced AI Features
- Semantic search with embeddings
- Auto-tagging based on content
- Similar notes recommendations
- AI chat assistant

### Collaboration
- Real-time collaboration via Supabase Realtime
- Shared workspaces
- Comments and mentions
- Activity feed

### Mobile Apps
- React Native for iOS/Android
- Shared business logic via hooks
- Native sync with web app

### Desktop App
- Electron wrapper
- Native file system access
- System tray integration
- Global hotkeys

### Plugin System
\`\`\`typescript
interface Plugin {
  id: string;
  name: string;
  version: string;
  init: (app: AppContext) => void;
  commands?: Command[];
  views?: CustomView[];
}
\`\`\`
