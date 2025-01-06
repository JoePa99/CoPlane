import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { ScheduledMaintenanceDialog } from './ScheduledMaintenanceDialog';

export function ScheduledMaintenanceButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Calendar className="h-4 w-4 mr-2" />
        Schedule Maintenance
      </button>

      <ScheduledMaintenanceDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}