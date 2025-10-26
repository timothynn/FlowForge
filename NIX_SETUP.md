# FlowForge - Nix Setup Guide ❄️

FlowForge includes a Nix flake for reproducible development environments.

## What is Nix?

Nix is a package manager that ensures reproducible builds and development environments. With Nix, everyone on your team will have the exact same versions of Node.js, PostgreSQL, and other tools.

## Prerequisites

1. **Install Nix** (if you haven't already)

   ```bash
   # Multi-user installation (recommended)
   sh <(curl -L https://nixos.org/nix/install) --daemon
   ```

2. **Enable Flakes** (required for this project)

   Add this to `~/.config/nix/nix.conf` (create if it doesn't exist):
   ```
   experimental-features = nix-command flakes
   ```

3. **Install direnv** (optional but recommended)

   ```bash
   # On macOS with Homebrew
   brew install direnv

   # On Ubuntu/Debian
   sudo apt install direnv

   # Or with Nix
   nix profile install nixpkgs#direnv
   ```

   Then add to your shell config (`~/.bashrc`, `~/.zshrc`, etc.):
   ```bash
   eval "$(direnv hook bash)"  # or zsh, fish, etc.
   ```

## Quick Start with Nix

### Option 1: Using direnv (Automatic - Recommended)

```bash
# Clone the repository
git clone https://github.com/yourusername/flowforge.git
cd flowforge

# Allow direnv (first time only)
direnv allow

# The environment will load automatically!
# You'll see the FlowForge welcome message
```

Now whenever you `cd` into the project directory, the development environment will load automatically! 🎉

### Option 2: Using nix develop (Manual)

```bash
# Clone the repository
git clone https://github.com/yourusername/flowforge.git
cd flowforge

# Enter the development environment
nix develop

# You'll see the FlowForge welcome message
```

## What's Included in the Nix Environment?

The flake provides:

- ✅ **Node.js 20** - Latest LTS version
- ✅ **npm, pnpm, yarn** - All package managers
- ✅ **PostgreSQL 15** - Database server
- ✅ **Prisma CLI** - Database ORM tools
- ✅ **Git** - Version control
- ✅ **OpenSSL** - For generating secrets

## Using the Nix Environment

Once you're in the Nix shell (either automatically with direnv or manually with `nix develop`):

```bash
# Install dependencies
npm install

# Setup database
npx prisma generate
npx prisma db push
npx prisma db seed

# Start development server
npm run dev
```

## Using Local PostgreSQL (Optional)

The Nix environment sets up environment variables for a local PostgreSQL instance:

```bash
# Initialize PostgreSQL data directory (first time only)
initdb -D .postgres/data

# Start PostgreSQL server
pg_ctl -D .postgres/data -l .postgres/logfile start

# Create database
createdb flowforge

# Your DATABASE_URL is automatically set to:
# postgresql://localhost:5432/flowforge?host=$PWD/.postgres

# Stop PostgreSQL when done
pg_ctl -D .postgres/data stop
```

Or you can still use **Supabase** as described in SETUP_GUIDE.md!

## Benefits of Using Nix

### 1. **Reproducibility**
Everyone on your team gets the exact same versions of all tools.

### 2. **No System Pollution**
Tools are isolated to your project. No global npm installs, no version conflicts.

### 3. **Easy Onboarding**
New team members just need:
```bash
git clone <repo>
cd flowforge
nix develop  # or direnv allow
npm install
```

### 4. **Cross-Platform**
Works the same on Linux, macOS, and WSL.

### 5. **Declarative**
The entire development environment is defined in `flake.nix`.

## Customizing the Flake

Edit `flake.nix` to add more tools:

```nix
buildInputs = with pkgs; [
  nodejs_20
  postgresql_15
  # Add more packages here:
  redis
  docker
  # etc.
];
```

Then reload:
```bash
direnv reload  # if using direnv
# or
exit           # and re-enter with `nix develop`
```

## Troubleshooting

### Issue: "experimental-features not enabled"

**Solution:** Enable flakes in your Nix config:
```bash
mkdir -p ~/.config/nix
echo "experimental-features = nix-command flakes" >> ~/.config/nix/nix.conf
```

### Issue: direnv not loading automatically

**Solution:** Make sure you've added the direnv hook to your shell config and reloaded it:
```bash
# Add to ~/.bashrc or ~/.zshrc
eval "$(direnv hook bash)"  # or zsh

# Reload your shell
source ~/.bashrc  # or ~/.zshrc
```

### Issue: Prisma engines not found

**Solution:** The flake automatically sets up Prisma engine paths. If you still have issues:
```bash
npx prisma generate
```

### Issue: PostgreSQL connection error

**Solution:** If using Supabase, make sure your `DATABASE_URL` in `.env.local` is correct. If using local PostgreSQL, ensure it's running:
```bash
pg_ctl -D .postgres/data status
```

## Updating Dependencies

To update the Nix flake dependencies:

```bash
nix flake update
```

## Comparison: With vs Without Nix

### Without Nix
```bash
# Install Node.js somehow
# Hope it's the right version
# Install PostgreSQL somehow
# Configure everything
# Hope it works on your teammate's machine
```

### With Nix
```bash
cd flowforge
nix develop  # Everything just works ✨
```

## Resources

- [Nix Official Site](https://nixos.org/)
- [Nix Flakes Guide](https://nixos.wiki/wiki/Flakes)
- [direnv Documentation](https://direnv.net/)
- [Zero to Nix](https://zero-to-nix.com/) - Great tutorial

## Alternative: Docker

If you prefer Docker, see `docker-compose.yml` (coming soon) for a containerized development environment.

---

**Enjoy reproducible development! ❄️**
