{
  description = "FlowForge - A modern project management platform";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            # Node.js and package managers
            nodejs_20
            nodePackages.npm
            nodePackages.pnpm
            yarn

            # Database
            postgresql_15

            # Development tools
            git
            openssl

            # Prisma CLI
            nodePackages.prisma
          ];

          shellHook = ''
            echo "🔥 FlowForge Development Environment"
            echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
            echo "📦 Node.js version: $(node --version)"
            echo "📦 npm version: $(npm --version)"
            echo "📦 pnpm version: $(pnpm --version)"
            echo "🐘 PostgreSQL version: $(postgres --version | head -n1)"
            echo ""
            echo "🚀 Quick Start Commands:"
            echo "  npm install          - Install dependencies"
            echo "  npm run dev          - Start development server"
            echo "  npx prisma studio    - Open Prisma Studio"
            echo "  npx prisma db push   - Push database schema"
            echo ""
            echo "📚 Documentation:"
            echo "  cat QUICK_START.md   - Quick start guide"
            echo "  cat SETUP_GUIDE.md   - Detailed setup"
            echo ""
            echo "💡 Don't forget to copy .env.example to .env.local"
            echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

            # Set up environment variables for local PostgreSQL if needed
            export PGDATA="$PWD/.postgres/data"
            export PGHOST="$PWD/.postgres"
            export PGDATABASE="flowforge"
            export DATABASE_URL="postgresql://localhost:5432/flowforge?host=$PGHOST"

            # Create .env.local if it doesn't exist
            if [ ! -f .env.local ]; then
              echo ""
              echo "⚠️  .env.local not found. Creating from .env.example..."
              if [ -f .env.example ]; then
                cp .env.example .env.local
                echo "✅ Created .env.local - please update it with your credentials"
              fi
            fi
          '';

          # Environment variables
          PRISMA_SCHEMA_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/schema-engine";
          PRISMA_QUERY_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/query-engine";
          PRISMA_QUERY_ENGINE_LIBRARY = "${pkgs.prisma-engines}/lib/libquery_engine.node";
          PRISMA_INTROSPECTION_ENGINE_BINARY = "${pkgs.prisma-engines}/bin/introspection-engine";
          PRISMA_FMT_BINARY = "${pkgs.prisma-engines}/bin/prisma-fmt";
        };

        # Formatter for nix files
        formatter = pkgs.nixpkgs-fmt;
      }
    );
}
