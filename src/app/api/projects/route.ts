import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, description, color, workspaceId } = await req.json();

    if (!name || !workspaceId) {
      return NextResponse.json(
        { error: 'Project name and workspace are required' },
        { status: 400 }
      );
    }

    // Verify user has access to workspace
    const workspace = await db.workspace.findFirst({
      where: {
        id: workspaceId,
        members: {
          some: {
            userId: session.user.id,
          },
        },
      },
    });

    if (!workspace) {
      return NextResponse.json(
        { error: 'Workspace not found' },
        { status: 404 }
      );
    }

    const project = await db.project.create({
      data: {
        name,
        description,
        color: color || '#3b82f6',
        workspaceId,
        members: {
          create: {
            userId: session.user.id,
            role: 'ADMIN',
          },
        },
        columns: {
          create: [
            {
              name: 'To Do',
              order: 0,
              color: '#ef4444',
            },
            {
              name: 'In Progress',
              order: 1,
              color: '#f59e0b',
            },
            {
              name: 'Done',
              order: 2,
              color: '#10b981',
            },
          ],
        },
      },
      include: {
        columns: true,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
