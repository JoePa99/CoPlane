import { useState, useEffect } from 'react';
import { Modal } from '../Modal';
import { useMaintenanceLogs } from '../../hooks/useMaintenanceLogs';
import { useUpdateMaintenanceLog } from '../../hooks/useUpdateMaintenanceLog';
import { MAINTENANCE_TYPES } from '../../constants/maintenance';

interface EditMaintenanceDialogProps {
  logId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function EditMaintenanceDialog({ logId, isOpen, onClose }: EditMaintenanceDialogProps) {
  const { data: logs = [] } = useMaintenanceLogs();
  const updateLog = useUpdateMaintenanceLog();
  const [title, setTitle] = useState('');
  const [type, setType] = useState(MAINTENANCE_TYPES[0]);
  const [scheduleType, setScheduleType] = useState<'DATE' | 'HOBBS'>('DATE');
  const [dueDate, setDueDate] = useState('');
  const [hobbsTime, setHobbsTime] = useState('');
  const [priority, setPriority] = useState('MEDIUM');
  const [mechanicName, setMechanicName] = useState('');
  const [description, setDescription] = useState('');
  const [maintenanceType, setMaintenanceType] = useState<'QUICK' | 'SCHEDULED'>('SCHEDULED');

  useEffect(() => {
    const log = logs.find(l => l.id === logId);
    if (log) {
      setTitle(log.title);
      setType(log.type);
      setScheduleType(log.schedule_type);
      setDueDate(log.due_date || '');
      setHobbsTime(log.hobbs_time?.toString() || '');
      setPriority(log.priority || 'MEDIUM');
      setMechanicName(log.mechanic_name);
      setDescription(log.description);
      setMaintenanceType(log.maintenance_type);
    }
  }, [logId, logs]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateLog.mutateAsync({
        id: logId,
        title,
        type,
        schedule_type: scheduleType,
        due_date: scheduleType === 'DATE' ? dueDate : null,
        hobbs_time: scheduleType === 'HOBBS' ? parseFloat(hobbsTime) : null,
        priority: maintenanceType === 'SCHEDULED' ? priority : undefined,
        mechanic_name: mechanicName,
        description
      });
      onClose();
    } catch (error) {
      console.error('Failed to update maintenance log:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Maintenance">
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
          <label htmlFor="scheduleType" className="block text-sm font-medium text-gray-700">
            Schedule Type
          </label>
          <select
            id="scheduleType"
            value={scheduleType}
            onChange={(e) => setScheduleType(e.target.value as 'DATE' | 'HOBBS')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="DATE">Date-based</option>
            <option value="HOBBS">Hobbs Time-based</option>
          </select>
        </div>

        {scheduleType === 'DATE' ? (
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              id="dueDate"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        ) : (
          <div>
            <label htmlFor="hobbsTime" className="block text-sm font-medium text-gray-700">
              Hobbs Time (hours)
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
        )}

        {maintenanceType === 'SCHEDULED' && (
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <select
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
          </div>
        )}

        <div>
          <label htmlFor="mechanicName" className="block text-sm font-medium text-gray-700">
            Assigned Mechanic
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
          disabled={updateLog.isPending}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
        >
          {updateLog.isPending ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </Modal>
  );
}