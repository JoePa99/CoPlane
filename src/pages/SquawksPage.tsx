import { useState } from 'react';
import { Plus } from 'lucide-react';
import { SquawkList } from '../components/squawks/SquawkList';
import { ReportSquawkDialog } from '../components/squawks/ReportSquawkDialog';

export default function SquawksPage() {
  const [isReportingSquawk, setIsReportingSquawk] = useState(false);

  return (
    <div className="max-w-full lg:max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Squawks</h1>
        <button
          onClick={() => setIsReportingSquawk(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Report Squawk
        </button>
      </div>

      <div className="overflow-hidden">
        <SquawkList />
      </div>

      <ReportSquawkDialog
        isOpen={isReportingSquawk}
        onClose={() => setIsReportingSquawk(false)}
      />
    </div>
  );
}