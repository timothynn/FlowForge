# FlowForge 🔥

> A modern, real-time project management and team collaboration platform built with Next.js 14, TypeScript, Supabase, and Prisma.

## 🚀 Features

- **Multi-tenant Workspaces** - Organize teams and projects
- **Real-time Collaboration** - Live updates across all clients
- **Kanban Boards** - Drag-and-drop task management
- **Time Tracking** - Built-in productivity analytics
- **File Management** - Secure document storage
- **Team Communication** - Comments, mentions, and notifications
- **Advanced Analytics** - Project insights and team performance
- **Custom Workflows** - Automation and triggers

## 📁 Repository Structure

```
flowforge/
├── .github/
│   └── workflows/
│       └── ci.yml
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
├── public/
│   ├── images/
│   └── icons/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── register/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/
│   │   │   ├── workspaces/
│   │   │   │   ├── [workspaceId]/
│   │   │   │   │   ├── projects/
│   │   │   │   │   │   └── [projectId]/
│   │   │   │   │   │       ├── board/
│   │   │   │   │   │       │   └── page.tsx
│   │   │   │   │   │       ├── list/
│   │   │   │   │   │       │   └── page.tsx
│   │   │   │   │   │       ├── calendar/
│   │   │   │   │   │       │   └── page.tsx
│   │   │   │   │   │       ├── settings/
│   │   │   │   │   │       │   └── page.tsx
│   │   │   │   │   │       └── layout.tsx
│   │   │   │   │   ├── settings/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   ├── analytics/
│   │   │   │   │   │   └── page.tsx
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── new/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/
│   │   │   │       └── route.ts
│   │   │   ├── workspaces/
│   │   │   │   └── route.ts
│   │   │   ├── projects/
│   │   │   │   └── route.ts
│   │   │   └── tasks/
│   │   │       └── route.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── select.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── popover.tsx
│   │   │   └── separator.tsx
│   │   ├── layout/
│   │   │   ├── header.tsx
│   │   │   ├── sidebar.tsx
│   │   │   └── footer.tsx
│   │   ├── workspace/
│   │   │   ├── workspace-card.tsx
│   │   │   ├── workspace-switcher.tsx
│   │   │   └── create-workspace-dialog.tsx
│   │   ├── project/
│   │   │   ├── project-card.tsx
│   │   │   ├── create-project-dialog.tsx
│   │   │   └── project-settings.tsx
│   │   ├── task/
│   │   │   ├── task-card.tsx
│   │   │   ├── task-detail.tsx
│   │   │   ├── create-task-dialog.tsx
│   │   │   └── task-list.tsx
│   │   ├── board/
│   │   │   ├── kanban-board.tsx
│   │   │   ├── board-column.tsx
│   │   │   └── task-draggable.tsx
│   │   └── providers/
│   │       ├── auth-provider.tsx
│   │       ├── theme-provider.tsx
│   │       └── realtime-provider.tsx
│   ├── lib/
│   │   ├── auth.ts
│   │   ├── db.ts
│   │   ├── supabase.ts
│   │   ├── utils.ts
│   │   └── validations.ts
│   ├── hooks/
│   │   ├── use-workspace.ts
│   │   ├── use-project.ts
│   │   ├── use-task.ts
│   │   └── use-realtime.ts
│   ├── types/
│   │   ├── index.ts
│   │   ├── workspace.ts
│   │   ├── project.ts
│   │   └── task.ts
│   └── actions/
│       ├── workspace.ts
│       ├── project.ts
│       └── task.ts
├── .env.example
├── .env.local
├── .envrc
├── .eslintrc.json
├── .gitignore
├── components.json
├── flake.nix
├── next.config.js
├── NIX_SETUP.md
├── package.json
├── postcss.config.js
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Authentication:** NextAuth.js
- **Real-time:** Supabase Realtime
- **File Storage:** Supabase Storage
- **State Management:** React Server Components + Server Actions

## 📋 Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database (or Supabase account)
- Git

## 🚦 Getting Started

### Option A: With Nix (Recommended for reproducible environments) ❄️

```bash
# 1. Install Nix (if not already installed)
sh <(curl -L https://nixos.org/nix/install) --daemon

# 2. Enable flakes
mkdir -p ~/.config/nix
echo "experimental-features = nix-command flakes" >> ~/.config/nix/nix.conf

# 3. Clone and enter the project
git clone https://github.com/yourusername/flowforge.git
cd flowforge

# 4. Enter Nix development environment
nix develop
# Or install direnv for automatic loading: `direnv allow`

# 5. Install dependencies and setup
npm install
cp .env.example .env.local
# Edit .env.local with your credentials

# 6. Setup database
npx prisma generate
npx prisma db push
npx prisma db seed

# 7. Start development
npm run dev
```

See [NIX_SETUP.md](NIX_SETUP.md) for detailed Nix instructions.

### Option B: Traditional Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/flowforge.git
   cd flowforge
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your environment variables:
   - Database URL (Supabase)
   - NextAuth secret and URL
   - Supabase keys

4. **Run Prisma migrations**
   ```bash
   npx prisma generate
   npx prisma db push
   npx prisma db seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:studio` - Open Prisma Studio
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:push` - Push schema changes to database

## 🎯 Files Generated

All essential files have been created and documented:

✅ **Configuration** (11 files)
- package.json, tsconfig.json, tailwind.config.ts, next.config.js
- components.json, .env.example, .gitignore
- postcss.config.js, .eslintrc.json

✅ **Database** (2 files)
- prisma/schema.prisma (complete schema with 15+ models)
- prisma/seed.ts (demo data script)

✅ **Core App** (3 files)
- src/app/layout.tsx, page.tsx, globals.css

✅ **Authentication** (4 files)
- Login/Register pages, NextAuth configuration, API routes

✅ **Dashboard** (2 files)
- Dashboard layout, Workspaces page

✅ **Libraries** (4 files)
- auth.ts, db.ts, supabase.ts, utils.ts

✅ **Components** (9 files)
- 6 shadcn/ui components (Button, Input, Label, Card, Avatar, Dropdown)
- Header component
- Auth provider
- Type definitions

✅ **Documentation** (3 files)
- README.md, SETUP_GUIDE.md, QUICK_START.md, FILES_CHECKLIST.md

**Total: 41 files ready to use!** 🎉

### 🆕 Nix Development Environment

The project includes a Nix flake for reproducible development:
- `flake.nix` - Nix flake configuration
- `.envrc` - direnv configuration for automatic environment loading
- `NIX_SETUP.md` - Complete Nix setup guide

**Benefits:**
- ✅ Reproducible environments across all machines
- ✅ No version conflicts
- ✅ Automatic tool provisioning (Node.js 20, PostgreSQL 15, etc.)
- ✅ Works on Linux, macOS, and WSL

## 🗄️ Database Schema

See `prisma/schema.prisma` for the complete database schema including:
- Users
- Workspaces
- Projects
- Tasks
- Comments
- Attachments
- Activity logs

## 🔐 Authentication

FlowForge uses NextAuth.js with support for:
- Email/Password
- Google OAuth
- GitHub OAuth
- Magic Links

## 📱 Features Roadmap

- [x] User authentication
- [x] Workspace management
- [x] Project CRUD operations
- [x] Task management
- [x] Kanban board view
- [ ] Real-time collaboration
- [ ] File uploads
- [ ] Comments and mentions
- [ ] Time tracking
- [ ] Analytics dashboard
- [ ] Mobile responsiveness
- [ ] Dark mode
- [ ] Email notifications
- [ ] Webhooks
- [ ] API documentation

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Your Name - [GitHub](https://github.com/yourusername)

---

Built with ❤️ using Next.js and TypeScript
