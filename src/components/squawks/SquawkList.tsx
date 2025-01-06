import { useState } from 'react';
import { format } from 'date-fns';
import { FileText, Pencil, Trash2 } from 'lucide-react';
import { useSquawks } from '../../hooks/useSquawks';
import { useDeleteSquawk } from '../../hooks/useDeleteSquawk';
import { ResolveSquawkDialog } from './ResolveSquawkDialog';
import { EditSquawkDialog } from './EditSquawkDialog';
import type { Squawk } from '../../types/squawk';

export function SquawkList() {
  const { data: allSquawks = [], isLoading } = useSquawks();
  const deleteSquawk = useDeleteSquawk();
  const [resolvingSquawk, setResolvingSquawk] = useState<Squawk | null>(null);
  const [editingSquawk, setEditingSquawk] = useState<Squawk | null>(null);

  // Filter out resolved squawks
  const squawks = allSquawks.filter(squawk => squawk.status === 'OPEN');

  if (isLoading) {
    return <div className="p-4 bg-white rounded-lg shadow">Loading squawks...</div>;
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this squawk?')) return;
    
    try {
      await deleteSquawk.mutateAsync(id);
    } catch (error) {
      console.error('Failed to delete squawk:', error);
      alert('Failed to delete squawk');
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return 'bg-red-100 text-red-800';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-800';
      case 'LOW': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (squawks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
        No open squawks
      </div>
    );
  }

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
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reported By
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {squawks.map((squawk) => (
                  <tr key={squawk.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(new Date(squawk.date), 'MMM d, yyyy')}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div>
                        <div className="flex items-center gap-2">
                          {squawk.title}
                          {squawk.attachment_url && (
                            <a
                              href={squawk.attachment_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <FileText className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                        <div className="text-gray-500">{squawk.description}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(squawk.priority)}`}>
                        {squawk.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {squawk.profiles.full_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => setEditingSquawk(squawk)}
                          className="text-gray-400 hover:text-gray-600"
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(squawk.id)}
                          className="text-gray-400 hover:text-gray-600"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setResolvingSquawk(squawk)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          Resolve
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

      {resolvingSquawk && (
        <ResolveSquawkDialog
          squawk={resolvingSquawk}
          isOpen={true}
          onClose={() => setResolvingSquawk(null)}
        />
      )}

      {editingSquawk && (
        <EditSquawkDialog
          squawk={editingSquawk}
          isOpen={true}
          onClose={() => setEditingSquawk(null)}
        />
      )}
    </>
  );
}