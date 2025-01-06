import { useState } from 'react';
import { Modal } from '../Modal';
import { useCreateMaintenanceLog } from '../../hooks/useCreateMaintenanceLog';
import { MAINTENANCE_TYPES } from '../../constants/maintenance';

interface QuickLogDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QuickLogDialog({ isOpen, onClose }: QuickLogDialogProps) {
  const createLog = useCreateMaintenanceLog();
  const [title, setTitle] = useState('');
  const [type, setType] = useState(MAINTENANCE_TYPES[0]);
  const [hobbsTime, setHobbsTime] = useState('');
  const [completionDate, setCompletionDate] = useState(new Date().toISOString().split('T')[0]);
  const [mechanicName, setMechanicName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createLog.mutateAsync({
        title,
        type,
        maintenance_type: 'QUICK',
        schedule_type: 'HOBBS',
        hobbs_time: parseFloat(hobbsTime),
        completion_date: completionDate,
        mechanic_name: mechanicName,
        completed_by: mechanicName,
        description,
        status: 'COMPLETED'
      });
      onClose();
    } catch (error) {
      console.error('Failed to create quick log:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Quick Maintenance Log">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
          >
            {MAINTENANCE_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="hobbsTime" className="block text-sm font-medium text-gray-700">
            Hobbs Time
          </label>
          <input
            type="number"
            id="hobbsTime"
            required
            step="0.1"
            value={hobbsTime}
            onChange={(e) => setHobbsTime(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label htmlFor="completionDate" className="block text-sm font-medium text-gray-700">
            Completion Date
          </label>
          <input
            type="date"
            id="completionDate"
            required
            value={completionDate}
            onChange={(e) => setCompletionDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label htmlFor="mechanicName" className="block text-sm font-medium text-gray-700">
            Mechanic Name
          </label>
          <input
            type="text"
            id="mechanicName"
            required
            value={mechanicName}
            onChange={(e) => setMechanicName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <button
          type="submit"
          disabled={createLog.isPending}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
        >
          {createLog.isPending ? 'Saving...' : 'Save Quick Log'}
        </button>
      </form>
    </Modal>
  );
}