'use client';

import { useState } from 'react';
import { BoardColumn } from './board-column';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface KanbanBoardProps {
  project: any;
}

export function KanbanBoard({ project }: KanbanBoardProps) {
  const [columns, setColumns] = useState(project.columns);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">{project.name}</h1>
            <p className="text-sm text-muted-foreground">
              {project.description}
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
      </div>

      {/* Board */}
      <div className="flex-1 overflow-x-auto p-4">
        <div className="flex gap-4 h-full min-w-max">
          {columns.map((column: any) => (
            <BoardColumn key={column.id} column={column} projectId={project.id} />
          ))}
          <div className="flex-shrink-0">
            <Button variant="outline" className="h-full min-h-[100px] w-[300px]">
              <Plus className="mr-2 h-4 w-4" />
              Add Column
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
