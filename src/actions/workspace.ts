'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import { generateSlug } from '@/lib/utils';

export async function createWorkspace(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;

  if (!name) {
    throw new Error('Workspace name is required');
  }

  const slug = generateSlug(name);

  const workspace = await db.workspace.create({
    data: {
      name,
      description,
      slug: `${slug}-${Date.now()}`,
      creatorId: session.user.id,
      members: {
        create: {
          userId: session.user.id,
          role: 'OWNER',
        },
      },
    },
  });

  revalidatePath('/workspaces');
  return workspace;
}

export async function updateWorkspace(workspaceId: string, formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  const name = formData.get('name') as string;
  const description = formData.get('description') as string;

  const workspace = await db.workspace.update({
    where: {
      id: workspaceId,
      members: {
        some: {
          userId: session.user.id,
          role: {
            in: ['OWNER', 'ADMIN'],
          },
        },
      },
    },
    data: {
      name,
      description,
    },
  });

  revalidatePath(`/workspaces/${workspaceId}`);
  return workspace;
}

export async function deleteWorkspace(workspaceId: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error('Unauthorized');
  }

  await db.workspace.delete({
    where: {
      id: workspaceId,
      members: {
        some: {
          userId: session.user.id,
          role: 'OWNER',
        },
      },
    },
  });

  revalidatePath('/workspaces');
}
