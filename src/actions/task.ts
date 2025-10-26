'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function createTask(projectId: string, columnId: string, formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const priority = formData.get('priority') as string;
  const assigneeId = formData.get('assigneeId') as string;

  if (!title) {
    throw new Error('Task title is required');
  }

  // Get the max order for tasks in this column
  const maxOrderTask = await db.task.findFirst({
    where: { columnId },
    orderBy: { order: 'desc' },
    select: { order: true },
  });

  const task = await db.task.create({
    data: {
      title,
      description,
      priority: priority as any || 'MEDIUM',
      order: (maxOrderTask?.order || 0) + 1,
      projectId,
      columnId,
      assigneeId: assigneeId || null,
    },
  });

  const project = await db.project.findUnique({
    where: { id: projectId },
    select: { workspaceId: true },
  });

  revalidatePath(`/workspaces/${project?.workspaceId}/projects/${projectId}`);
  return task;
}

export async function updateTask(taskId: string, formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const priority = formData.get('priority') as string;
  const status = formData.get('status') as string;
  const assigneeId = formData.get('assigneeId') as string;

  const task = await db.task.update({
    where: { id: taskId },
    data: {
      title,
      description,
      priority: priority as any,
      status: status as any,
      assigneeId: assigneeId || null,
    },
    include: {
      project: true,
    },
  });

  revalidatePath(`/workspaces/${task.project.workspaceId}/projects/${task.projectId}`);
  return task;
}

export async function deleteTask(taskId: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const task = await db.task.delete({
    where: { id: taskId },
    include: {
      project: true,
    },
  });

  revalidatePath(`/workspaces/${task.project.workspaceId}/projects/${task.projectId}`);
}

export async function moveTask(taskId: string, newColumnId: string, newOrder: number) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const task = await db.task.update({
    where: { id: taskId },
    data: {
      columnId: newColumnId,
      order: newOrder,
    },
    include: {
      project: true,
    },
  });

  revalidatePath(`/workspaces/${task.project.workspaceId}/projects/${task.projectId}`);
  return task;
}
