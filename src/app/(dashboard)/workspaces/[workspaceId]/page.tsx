import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, FolderKanban, Settings } from 'lucide-react';
import Link from 'next/link';

interface WorkspacePageProps {
  params: {
    workspaceId: string;
  };
}

export default async function WorkspacePage({ params }: WorkspacePageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const workspace = await db.workspace.findFirst({
    where: {
      id: params.workspaceId,
      members: {
        some: {
          userId: session.user.id,
        },
      },
    },
    include: {
      members: {
        include: {
          user: true,
        },
      },
      projects: {
        include: {
          _count: {
            select: {
              tasks: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  });

  if (!workspace) {
    redirect('/workspaces');
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{workspace.name}</h1>
          <p className="text-muted-foreground mt-2">
            {workspace.description || 'No description'}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href={`/workspaces/${workspace.id}/settings`}>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      {workspace.projects.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <FolderKanban className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground text-center mb-6">
              Create your first project to start managing tasks
            </p>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {workspace.projects.map((project) => (
            <Link
              key={project.id}
              href={`/workspaces/${workspace.id}/projects/${project.id}/board`}
            >
              <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: project.color || '#3b82f6' }}
                    />
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                  </div>
                  <CardDescription>
                    {project.description || 'No description'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {project._count.tasks} tasks
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.status === 'ACTIVE'
                          ? 'bg-green-100 text-green-800'
                          : project.status === 'COMPLETED'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
