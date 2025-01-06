import { useState, useEffect } from 'react';
import { DatePicker } from './DatePicker';
import { TimePicker } from './TimePicker';
import { useBookingForm } from '../../hooks/useBookingForm';
import { useUsers } from '../../hooks/useUsers';
import { Modal } from '../Modal';

interface BookingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialStartTime?: Date;
  initialEndTime?: Date;
}

export function BookingDialog({ 
  isOpen, 
  onClose, 
  initialStartTime, 
  initialEndTime 
}: BookingDialogProps) {
  const { data: users = [] } = useUsers();
  const [title, setTitle] = useState('');
  const [pilotId, setPilotId] = useState('');
  const [startDate, setStartDate] = useState(initialStartTime || new Date());
  const [endDate, setEndDate] = useState(initialEndTime || new Date(Date.now() + 3 * 60 * 60 * 1000));
  const [notes, setNotes] = useState('');

  const { submitForm, errors, isSubmitting, isAuthenticated } = useBookingForm(onClose);

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setPilotId(users[0]?.id || '');
      setStartDate(initialStartTime || new Date());
      setEndDate(initialEndTime || new Date(Date.now() + 3 * 60 * 60 * 1000));
      setNotes('');
    }
  }, [isOpen, initialStartTime, initialEndTime, users]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) return;
    
    await submitForm({
      title,
      pilotId,
      startDate,
      endDate,
      notes,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Booking">
      {Object.keys(errors).length > 0 && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded">
          {Object.values(errors).map((error, index) => (
            <div key={index} className="text-sm">{error}</div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`block w-full rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 ${
              errors.title ? 'border-red-300' : 'border-gray-300'
            }`}
            required
          />
        </div>

        <div>
          <label htmlFor="pilotId" className="block text-sm font-medium text-gray-700 mb-1">
            Pilot
          </label>
          <select
            id="pilotId"
            value={pilotId}
            onChange={(e) => setPilotId(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          >
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.full_name}
              </option>
            ))}
            <option value="other">Other</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start</label>
            <div className="space-y-2">
              <DatePicker
                selected={startDate}
                onChange={setStartDate}
                error={errors.times}
              />
              <TimePicker
                value={startDate}
                onChange={setStartDate}
                error={errors.times}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End</label>
            <div className="space-y-2">
              <DatePicker
                selected={endDate}
                onChange={setEndDate}
                error={errors.times}
              />
              <TimePicker
                value={endDate}
                onChange={setEndDate}
                error={errors.times}
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notes {pilotId === 'other' && <span className="text-primary-600">*</span>}
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            required={pilotId === 'other'}
            placeholder={pilotId === 'other' ? 'Please specify the pilot name' : undefined}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-md shadow-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !isAuthenticated}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md shadow-sm disabled:opacity-50"
          >
            {isSubmitting ? 'Creating...' : 'Create Booking'}
          </button>
        </div>
      </form>
    </Modal>
  );
}