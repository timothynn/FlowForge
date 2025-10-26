'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';

export async function createProject(workspaceId: string, formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const color = formData.get('color') as string;

  if (!name) {
    throw new Error('Project name is required');
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
  });

  revalidatePath(`/workspaces/${workspaceId}`);
  return project;
}

export async function updateProject(projectId: string, formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;
  const color = formData.get('color') as string;
  const status = formData.get('status') as string;

  const project = await db.project.update({
    where: {
      id: projectId,
      members: {
        some: {
          userId: session.user.id,
          role: {
            in: ['ADMIN'],
          },
        },
      },
    },
    data: {
      name,
      description,
      color,
      status: status as any,
    },
  });

  revalidatePath(`/workspaces/${project.workspaceId}/projects/${projectId}`);
  return project;
}

export async function deleteProject(projectId: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const project = await db.project.delete({
    where: {
      id: projectId,
      members: {
        some: {
          userId: session.user.id,
          role: 'ADMIN',
        },
      },
    },
  });

  revalidatePath(`/workspaces/${project.workspaceId}`);
}
