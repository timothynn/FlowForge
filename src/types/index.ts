import { Workspace, Project, Task, User, WorkspaceMember, ProjectMember } from '@prisma/client';

// Extended types with relations
export type WorkspaceWithMembers = Workspace & {
  members: (WorkspaceMember & { user: User })[];
  _count: {
    projects: number;
  };
};

export type ProjectWithMembers = Project & {
  members: (ProjectMember & { user: User })[];
  workspace: Workspace;
  _count: {
    tasks: number;
  };
};

export type TaskWithDetails = Task & {
  assignee: User | null;
  project: Project;
};

// NextAuth extended types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }

  interface User {
    id: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
  }
}
