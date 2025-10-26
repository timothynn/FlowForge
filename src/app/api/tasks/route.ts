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

    const { title, description, priority, projectId, columnId, assigneeId } =
      await req.json();

    if (!title || !projectId) {
      return NextResponse.json(
        { error: 'Title and project are required' },
        { status: 400 }
      );
    }

    // Verify user has access to project
    const project = await db.project.findFirst({
      where: {
        id: projectId,
        workspace: {
          members: {
            some: {
              userId: session.user.id,
            },
          },
        },
      },
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Get the max order for tasks in the column
    const maxOrderTask = await db.task.findFirst({
      where: { columnId },
      orderBy: { order: 'desc' },
      select: { order: true },
    });

    const task = await db.task.create({
      data: {
        title,
        description,
        priority: priority || 'MEDIUM',
        order: (maxOrderTask?.order || 0) + 1,
        projectId,
        columnId,
        assigneeId: assigneeId || null,
      },
      include: {
        assignee: true,
        column: true,
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error('Error creating task:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
