import { useState, useEffect } from 'react';
import { DatePicker } from './DatePicker';
import { TimePicker } from './TimePicker';
import { useUpdateBooking } from '../../hooks/useUpdateBooking';
import { useDeleteBooking } from '../../hooks/useDeleteBooking';
import { useUsers } from '../../hooks/useUsers';
import { Modal } from '../Modal';
import type { Booking } from '../../types/booking';

interface EditBookingDialogProps {
  booking: Booking;
  isOpen: boolean;
  onClose: () => void;
}

export function EditBookingDialog({ booking, isOpen, onClose }: EditBookingDialogProps) {
  const { data: users = [] } = useUsers();
  const [title, setTitle] = useState(booking.title);
  const [pilotId, setPilotId] = useState(booking.pilot_id || '');
  const [startDate, setStartDate] = useState(new Date(booking.start_time));
  const [endDate, setEndDate] = useState(new Date(booking.end_time));
  const [notes, setNotes] = useState(booking.notes || '');

  const updateBooking = useUpdateBooking();
  const deleteBooking = useDeleteBooking();

  useEffect(() => {
    if (isOpen) {
      setTitle(booking.title);
      setPilotId(booking.pilot_id || '');
      setStartDate(new Date(booking.start_time));
      setEndDate(new Date(booking.end_time));
      setNotes(booking.notes || '');
    }
  }, [isOpen, booking]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateBooking.mutateAsync({
        id: booking.id,
        title,
        pilot_id: pilotId === 'other' ? null : pilotId,
        start_time: startDate.toISOString(),
        end_time: endDate.toISOString(),
        notes: notes || null,
      });
      onClose();
    } catch (error) {
      console.error('Failed to update booking:', error);
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this booking?')) {
      try {
        await deleteBooking.mutateAsync(booking.id);
        onClose();
      } catch (error) {
        console.error('Failed to delete booking:', error);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Booking">
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
            className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
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
              <DatePicker selected={startDate} onChange={setStartDate} />
              <TimePicker value={startDate} onChange={setStartDate} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End</label>
            <div className="space-y-2">
              <DatePicker selected={endDate} onChange={setEndDate} />
              <TimePicker value={endDate} onChange={setEndDate} />
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

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md shadow-sm"
          >
            Delete Booking
          </button>
          <div className="space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 border border-gray-300 rounded-md shadow-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updateBooking.isPending}
              className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md shadow-sm disabled:opacity-50"
            >
              {updateBooking.isPending ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
}