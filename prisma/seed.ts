import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create a demo user
  const user = await prisma.user.upsert({
    where: { email: 'demo@flowforge.com' },
    update: {},
    create: {
      email: 'demo@flowforge.com',
      name: 'Demo User',
      image: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
    },
  });

  console.log('✅ Created demo user:', user.email);

  // Create a demo workspace
  const workspace = await prisma.workspace.upsert({
    where: { slug: 'demo-workspace' },
    update: {},
    create: {
      name: 'Demo Workspace',
      slug: 'demo-workspace',
      description: 'A sample workspace to get you started',
      creatorId: user.id,
      members: {
        create: {
          userId: user.id,
          role: 'OWNER',
        },
      },
    },
  });

  console.log('✅ Created demo workspace:', workspace.name);

  // Create a demo project
  const project = await prisma.project.create({
    data: {
      name: 'Getting Started Project',
      description: 'Learn the basics of FlowForge',
      color: '#3b82f6',
      workspaceId: workspace.id,
      members: {
        create: {
          userId: user.id,
          role: 'ADMIN',
        },
      },
    },
  });

  console.log('✅ Created demo project:', project.name);

  // Create default columns
  const todoColumn = await prisma.column.create({
    data: {
      name: 'To Do',
      order: 0,
      color: '#ef4444',
      projectId: project.id,
    },
  });

  const inProgressColumn = await prisma.column.create({
    data: {
      name: 'In Progress',
      order: 1,
      color: '#f59e0b',
      projectId: project.id,
    },
  });

  const doneColumn = await prisma.column.create({
    data: {
      name: 'Done',
      order: 2,
      color: '#10b981',
      projectId: project.id,
    },
  });

  console.log('✅ Created default columns');

  // Create sample tasks
  await prisma.task.createMany({
    data: [
      {
        title: 'Welcome to FlowForge!',
        description: 'This is your first task. Click on it to see more details.',
        status: 'TODO',
        priority: 'HIGH',
        order: 0,
        projectId: project.id,
        columnId: todoColumn.id,
        assigneeId: user.id,
      },
      {
        title: 'Explore the Kanban board',
        description: 'Drag and drop tasks between columns to update their status.',
        status: 'IN_PROGRESS',
        priority: 'MEDIUM',
        order: 0,
        projectId: project.id,
        columnId: inProgressColumn.id,
        assigneeId: user.id,
      },
      {
        title: 'Invite team members',
        description: 'Collaborate with your team by inviting them to your workspace.',
        status: 'TODO',
        priority: 'MEDIUM',
        order: 1,
        projectId: project.id,
        columnId: todoColumn.id,
      },
      {
        title: 'Create your first project',
        description: 'Start organizing your work by creating a new project.',
        status: 'DONE',
        priority: 'LOW',
        order: 0,
        projectId: project.id,
        columnId: doneColumn.id,
        completedAt: new Date(),
      },
    ],
  });

  console.log('✅ Created sample tasks');
  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
