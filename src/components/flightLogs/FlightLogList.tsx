import { useState } from 'react';
import { format } from 'date-fns';
import { Pencil, Trash2 } from 'lucide-react';
import { useFlightLogs } from '../../hooks/useFlightLogs';
import { useDeleteFlightLog } from '../../hooks/useDeleteFlightLog';
import { EditFlightLogDialog } from './EditFlightLogDialog';
import type { FlightLog } from '../../types/flightLog';

export function FlightLogList() {
  const { data: logs = [], isLoading } = useFlightLogs();
  const deleteLog = useDeleteFlightLog();
  const [editingLog, setEditingLog] = useState<FlightLog | null>(null);

  if (isLoading) {
    return <div className="p-4 bg-white rounded-lg shadow">Loading flight logs...</div>;
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this flight log?')) return;
    
    try {
      await deleteLog.mutateAsync(id);
    } catch (error) {
      console.error('Failed to delete flight log:', error);
      alert('Failed to delete flight log');
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow">
        <div className="w-full overflow-x-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
          <div className="min-w-[800px]">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pilot
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Route
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {logs.map((log) => {
                  const duration = log.hobbs_end - log.hobbs_start;
                  return (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {format(new Date(log.date), 'MMM d, yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {log.profiles?.full_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {log.departure_airport} → {log.arrival_airport}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {duration.toFixed(1)} hrs
                        <div className="text-xs text-gray-500">
                          {log.hobbs_start} → {log.hobbs_end}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {log.description || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setEditingLog(log)}
                            className="text-gray-400 hover:text-gray-600"
                            title="Edit"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(log.id)}
                            className="text-gray-400 hover:text-gray-600"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {editingLog && (
        <EditFlightLogDialog
          log={editingLog}
          isOpen={true}
          onClose={() => setEditingLog(null)}
        />
      )}
    </>
  );
}