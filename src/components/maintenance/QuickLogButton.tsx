import { useState } from 'react';
import { Plus } from 'lucide-react';
import { QuickLogDialog } from './QuickLogDialog';

export function QuickLogButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      >
        <Plus className="h-4 w-4 mr-2" />
        Quick Log
      </button>

      <QuickLogDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}