import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

interface SettingsPageProps {
  params: {
    workspaceId: string;
    projectId: string;
  };
}

export default async function SettingsPage({ params }: SettingsPageProps) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const project = await db.project.findFirst({
    where: {
      id: params.projectId,
      workspaceId: params.workspaceId,
      workspace: {
        members: {
          some: {
            userId: session.user.id,
          },
        },
      },
    },
    include: {
      members: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!project) {
    redirect('/workspaces');
  }

  return (
    <div className="container mx-auto py-6 px-4 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Project Settings</h2>
        <p className="text-muted-foreground">
          Manage your project configuration and members
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>General</CardTitle>
          <CardDescription>
            Update your project name, description, and other settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Project Name</p>
              <p className="text-sm text-muted-foreground">{project.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Description</p>
              <p className="text-sm text-muted-foreground">
                {project.description || 'No description'}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Status</p>
              <p className="text-sm text-muted-foreground">{project.status}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
          <CardDescription>
            Manage who has access to this project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {project.members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-medium">
                      {member.user.name?.charAt(0) || member.user.email?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">{member.user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {member.user.email}
                    </p>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 bg-muted rounded">
                  {member.role}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
