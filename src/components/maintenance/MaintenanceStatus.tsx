import { isAfter } from 'date-fns';

interface MaintenanceStatusProps {
  dueDate: string | null;
  hobbsTime: number | null;
}

export function MaintenanceStatus({ dueDate, hobbsTime }: MaintenanceStatusProps) {
  let status: 'upcoming' | 'due' | 'overdue' = 'upcoming';
  
  if (dueDate) {
    const now = new Date();
    const due = new Date(dueDate);
    const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
    
    if (isAfter(now, due)) {
      status = 'overdue';
    } else if (isAfter(due, thirtyDaysFromNow)) {
      status = 'upcoming';
    } else {
      status = 'due';
    }
  }
  
  // For Hobbs time, we'll just show upcoming since we don't track current Hobbs time
  
  const colors = {
    upcoming: 'bg-green-100 text-green-800',
    due: 'bg-yellow-100 text-yellow-800',
    overdue: 'bg-red-100 text-red-800',
  };

  const labels = {
    upcoming: 'Upcoming',
    due: 'Due Soon',
    overdue: 'Overdue',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colors[status]}`}
    >
      {labels[status]}
    </span>
  );
}