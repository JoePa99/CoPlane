import { useState } from 'react';
import { format } from 'date-fns';
import { FileText, Pencil, Trash2 } from 'lucide-react';
import { useMaintenanceLogs } from '../../hooks/useMaintenanceLogs';
import { useDeleteMaintenanceLog } from '../../hooks/useDeleteMaintenanceLog';
import { EditMaintenanceDialog } from './EditMaintenanceDialog';

export function MaintenanceList() {
  const { data: logs = [], isLoading } = useMaintenanceLogs();
  const deleteLog = useDeleteMaintenanceLog();
  const [editingLog, setEditingLog] = useState<string | null>(null);

  if (isLoading) {
    return <div className="p-4 bg-white rounded-lg shadow">Loading maintenance logs...</div>;
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this maintenance log?')) return;
    
    try {
      await deleteLog.mutateAsync(id);
    } catch (error) {
      console.error('Failed to delete maintenance log:', error);
      alert('Failed to delete maintenance log');
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
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mechanic
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.due_date ? format(new Date(log.due_date), 'MMM d, yyyy') : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.mechanic_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingLog(log.id)}
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {editingLog && (
        <EditMaintenanceDialog
          logId={editingLog}
          isOpen={true}
          onClose={() => setEditingLog(null)}
        />
      )}
    </>
  );
}