import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Zap, Users, BarChart3 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">FlowForge</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container flex flex-col items-center justify-center gap-8 px-4 py-24 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Project Management
            <br />
            <span className="text-primary">Made Simple</span>
          </h1>
          <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
            Collaborate in real-time, track progress effortlessly, and deliver
            projects faster with FlowForge.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/register">
            <Button size="lg" className="gap-2">
              Start Free Trial <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="border-t bg-muted/50 py-24">
        <div className="container px-4">
          <div className="mx-auto mb-16 max-w-[700px] text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Everything you need
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful features to help your team collaborate and succeed
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center gap-4 rounded-lg border bg-background p-8 text-center">
              <div className="rounded-full bg-primary/10 p-3">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Task Management</h3>
              <p className="text-muted-foreground">
                Create, assign, and track tasks with ease using our intuitive
                Kanban boards.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 rounded-lg border bg-background p-8 text-center">
              <div className="rounded-full bg-primary/10 p-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Team Collaboration</h3>
              <p className="text-muted-foreground">
                Work together in real-time with comments, mentions, and instant
                updates.
              </p>
            </div>
            <div className="flex flex-col items-center gap-4 rounded-lg border bg-background p-8 text-center">
              <div className="rounded-full bg-primary/10 p-3">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Analytics & Reports</h3>
              <p className="text-muted-foreground">
                Get insights into team performance and project progress with
                detailed analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container px-4 text-center text-sm text-muted-foreground">
          © 2024 FlowForge. Built with Next.js, TypeScript, and Supabase.
        </div>
      </footer>
    </div>
  );
}
