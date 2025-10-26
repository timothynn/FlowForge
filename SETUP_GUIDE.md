# FlowForge Setup Guide 🚀

Complete step-by-step guide to get FlowForge running on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18+ and npm/yarn/pnpm
- **Git**
- **PostgreSQL** (or use Supabase)
- A code editor (VS Code recommended)

## Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/flowforge.git
cd flowforge
```

## Step 2: Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

## Step 3: Set Up Supabase

### Option A: Create a Supabase Project (Recommended)

1. Go to [https://supabase.com](https://supabase.com)
2. Click "Start your project" and sign in
3. Create a new project
4. Once created, go to **Settings** → **API**
5. Copy the following:
   - Project URL
   - `anon` public key
   - `service_role` secret key (Settings → API → Service role key)

### Option B: Use Local PostgreSQL

If you prefer to use a local PostgreSQL database:

```bash
# Create a database
createdb flowforge

# Your DATABASE_URL will be:
# postgresql://username:password@localhost:5432/flowforge
```

## Step 4: Configure Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env.local
```

2. Open `.env.local` and fill in your values:

```env
# Database (Use your Supabase connection string or local PostgreSQL)
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-REF].supabase.co:5432/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-REF].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-this-with-openssl-rand-base64-32"

# OAuth Providers (Optional - can skip for now)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### Generate NEXTAUTH_SECRET

Run this command in your terminal:
```bash
openssl rand -base64 32
```

Copy the output and paste it as your `NEXTAUTH_SECRET`.

## Step 5: Set Up Database with Prisma

```bash
# Generate Prisma Client
npx prisma generate

# Push the schema to your database
npx prisma db push

# Seed the database with demo data
npx prisma db seed
```

This will create:
- A demo user (email: `demo@flowforge.com`)
- A demo workspace
- A demo project with sample tasks
- Default Kanban columns (To Do, In Progress, Done)

## Step 6: Configure OAuth Providers (Optional)

### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to **Credentials** → **Create Credentials** → **OAuth client ID**
5. Application type: **Web application**
6. Authorized redirect URIs: `http://localhost:3000/api/auth/callback/google`
7. Copy Client ID and Client Secret to `.env.local`

### GitHub OAuth

1. Go to [GitHub Settings → Developer settings → OAuth Apps](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in:
   - Application name: `FlowForge Dev`
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and generate a Client Secret
5. Add to `.env.local`

## Step 7: Install shadcn/ui Components

The project uses shadcn/ui. Install additional components as needed:

```bash
# Example: Install additional components
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add select
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add separator
```

## Step 8: Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 9: Test the Application

### Using Demo Account

If you ran the seed script, you can use:
- **Email:** `demo@flowforge.com`
- **Password:** (You'll need to set this up in your auth logic)

### Using OAuth

Click on Google or GitHub buttons to sign in with OAuth.

## Step 10: Explore Prisma Studio (Optional)

View and edit your database in a GUI:

```bash
npx prisma studio
```

This opens at [http://localhost:5555](http://localhost:5555)

## Common Issues & Solutions

### Issue: Prisma Client errors

**Solution:**
```bash
npx prisma generate
npx prisma db push
```

### Issue: Port 3000 already in use

**Solution:**
```bash
# Use a different port
npm run dev -- -p 3001
```

### Issue: Database connection errors

**Solution:**
- Verify your `DATABASE_URL` is correct
- Check if PostgreSQL is running
- For Supabase, ensure your password is URL-encoded if it contains special characters

### Issue: OAuth not working

**Solution:**
- Verify redirect URIs match exactly
- Check client ID and secrets are correct
- Ensure OAuth apps are not in development mode restrictions

## Project Structure Overview

```
flowforge/
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts             # Seed data
├── src/
│   ├── app/                # Next.js 14 app router
│   │   ├── (auth)/        # Authentication pages
│   │   ├── (dashboard)/   # Dashboard pages
│   │   └── api/           # API routes
│   ├── components/
│   │   ├── ui/            # shadcn/ui components
│   │   └── layout/        # Layout components
│   ├── lib/               # Utilities
│   │   ├── auth.ts        # NextAuth config
│   │   ├── db.ts          # Prisma client
│   │   └── supabase.ts    # Supabase client
│   └── types/             # TypeScript types
└── public/                # Static files
```

## Next Steps

### Phase 1: Core Features (Week 1-2)
- [ ] Create workspace functionality
- [ ] Create project functionality
- [ ] Create task functionality
- [ ] Workspace member management

### Phase 2: Kanban Board (Week 3-4)
- [ ] Build Kanban board component
- [ ] Implement drag-and-drop
- [ ] Column management
- [ ] Task detail modal

### Phase 3: Real-time Features (Week 5-6)
- [ ] Set up Supabase Realtime
- [ ] Live task updates
- [ ] Online presence indicators
- [ ] Activity feed

### Phase 4: Advanced Features (Week 7-8)
- [ ] Comments system
- [ ] File uploads with Supabase Storage
- [ ] Time tracking
- [ ] Notifications

### Phase 5: Analytics & Polish (Week 9-12)
- [ ] Analytics dashboard
- [ ] Project insights
- [ ] Team performance metrics
- [ ] UI/UX improvements
- [ ] Testing & bug fixes

## Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm run start           # Start production server

# Database
npx prisma studio       # Open Prisma Studio
npx prisma generate     # Generate Prisma Client
npx prisma db push      # Push schema changes
npx prisma db seed      # Seed database
npx prisma migrate dev  # Create migration

# Code Quality
npm run lint            # Run ESLint
```

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase service role key |
| `NEXTAUTH_URL` | Yes | Your app URL |
| `NEXTAUTH_SECRET` | Yes | Random secret for NextAuth |
| `GOOGLE_CLIENT_ID` | No | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | No | Google OAuth secret |
| `GITHUB_CLIENT_ID` | No | GitHub OAuth client ID |
| `GITHUB_CLIENT_SECRET` | No | GitHub OAuth secret |

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Support

If you encounter issues:

1. Check the [Common Issues](#common-issues--solutions) section
2. Search existing GitHub issues
3. Create a new issue with detailed information
4. Join our Discord community (link in README)

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

---

**Happy coding! 🎉**

Built with ❤️ for your capstone project
