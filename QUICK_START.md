# FlowForge - Quick Start 🚀

Get FlowForge running in 5 minutes!

## TL;DR

```bash
# 1. Clone and install
git clone https://github.com/yourusername/flowforge.git
cd flowforge
npm install

# 2. Setup environment
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# 3. Setup database
npx prisma generate
npx prisma db push
npx prisma db seed

# 4. Run
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Minimum Required Environment Variables

```env
DATABASE_URL="your-supabase-postgres-url"
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="run: openssl rand -base64 32"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Get Supabase Credentials

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → API
4. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon public → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role → `SUPABASE_SERVICE_ROLE_KEY`
5. Go to Settings → Database
6. Copy connection string → `DATABASE_URL`

## Common Commands

```bash
npm run dev          # Start development server
npx prisma studio    # View database in GUI
npx prisma db push   # Update database schema
```

## What's Included

✅ Authentication (NextAuth + OAuth)  
✅ Workspace management  
✅ Project management  
✅ Task management  
✅ Demo data seeded  
✅ Beautiful UI (shadcn/ui)  
✅ TypeScript  
✅ Responsive design

## Need Help?

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions.

---

**You're all set! Start building! 🎉**
