'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, MessageSquare, Paperclip } from 'lucide-react';
import { formatDate, getInitials } from '@/lib/utils';

interface TaskCardProps {
  task: any;
}

export function TaskCard({ task }: TaskCardProps) {
  const priorityColors = {
    LOW: 'bg-blue-100 text-blue-800',
    MEDIUM: 'bg-yellow-100 text-yellow-800',
    HIGH: 'bg-orange-100 text-orange-800',
    URGENT: 'bg-red-100 text-red-800',
  };

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow">
      <CardContent className="p-3 space-y-2">
        {/* Priority Badge */}
        <div className="flex items-center justify-between">
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${
              priorityColors[task.priority as keyof typeof priorityColors]
            }`}
          >
            {task.priority}
          </span>
        </div>

        {/* Title */}
        <h4 className="font-medium text-sm line-clamp-2">{task.title}</h4>

        {/* Description */}
        {task.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {task.dueDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(task.dueDate)}</span>
              </div>
            )}
          </div>

          {/* Assignee */}
          {task.assignee && (
            <Avatar className="h-6 w-6">
              <AvatarImage src={task.assignee.image || ''} />
              <AvatarFallback className="text-xs">
                {getInitials(task.assignee.name || task.assignee.email || 'U')}
              </AvatarFallback>
            </Avatar>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
