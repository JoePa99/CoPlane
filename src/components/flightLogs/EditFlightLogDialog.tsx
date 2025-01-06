import { useState, useEffect } from 'react';
import { Modal } from '../Modal';
import { useUpdateFlightLog } from '../../hooks/useUpdateFlightLog';
import { useUsers } from '../../hooks/useUsers';
import type { FlightLog } from '../../types/flightLog';

interface EditFlightLogDialogProps {
  log: FlightLog;
  isOpen: boolean;
  onClose: () => void;
}

export function EditFlightLogDialog({ log, isOpen, onClose }: EditFlightLogDialogProps) {
  const { data: users = [] } = useUsers();
  const updateLog = useUpdateFlightLog();
  const [date, setDate] = useState(log.date);
  const [pilotId, setPilotId] = useState(log.pilot_id);
  const [departureAirport, setDepartureAirport] = useState(log.departure_airport);
  const [arrivalAirport, setArrivalAirport] = useState(log.arrival_airport);
  const [hobbsStart, setHobbsStart] = useState(log.hobbs_start.toString());
  const [hobbsEnd, setHobbsEnd] = useState(log.hobbs_end.toString());
  const [description, setDescription] = useState(log.description || '');
  const [error, setError] = useState('');

  // Calculate duration in real-time
  const duration = parseFloat(hobbsEnd) - parseFloat(hobbsStart);
  const isValidDuration = !isNaN(duration) && duration > 0;

  useEffect(() => {
    if (isOpen) {
      setDate(log.date);
      setPilotId(log.pilot_id);
      setDepartureAirport(log.departure_airport);
      setArrivalAirport(log.arrival_airport);
      setHobbsStart(log.hobbs_start.toString());
      setHobbsEnd(log.hobbs_end.toString());
      setDescription(log.description || '');
      setError('');
    }
  }, [isOpen, log]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const hobbsStartNum = parseFloat(hobbsStart);
      const hobbsEndNum = parseFloat(hobbsEnd);

      if (hobbsEndNum <= hobbsStartNum) {
        setError('Hobbs end time must be greater than start time');
        return;
      }

      await updateLog.mutateAsync({
        id: log.id,
        date,
        pilot_id: pilotId,
        departure_airport: departureAirport.toUpperCase(),
        arrival_airport: arrivalAirport.toUpperCase(),
        hobbs_start: hobbsStartNum,
        hobbs_end: hobbsEndNum,
        description: description || null
      });

      onClose();
    } catch (err) {
      setError('Failed to update flight log');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Flight Log">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
            {error}
          </div>
        )}

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            id="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        <div>
          <label htmlFor="pilotId" className="block text-sm font-medium text-gray-700">
            Pilot
          </label>
          <select
            id="pilotId"
            required
            value={pilotId}
            onChange={(e) => setPilotId(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Select pilot</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.full_name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="departureAirport" className="block text-sm font-medium text-gray-700">
              Departure Airport
            </label>
            <input
              type="text"
              id="departureAirport"
              required
              value={departureAirport}
              onChange={(e) => setDepartureAirport(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label htmlFor="arrivalAirport" className="block text-sm font-medium text-gray-700">
              Arrival Airport
            </label>
            <input
              type="text"
              id="arrivalAirport"
              required
              value={arrivalAirport}
              onChange={(e) => setArrivalAirport(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="hobbsStart" className="block text-sm font-medium text-gray-700">
              Hobbs Start
            </label>
            <input
              type="number"
              id="hobbsStart"
              required
              step="0.1"
              value={hobbsStart}
              onChange={(e) => setHobbsStart(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label htmlFor="hobbsEnd" className="block text-sm font-medium text-gray-700">
              Hobbs End
            </label>
            <input
              type="number"
              id="hobbsEnd"
              required
              step="0.1"
              value={hobbsEnd}
              onChange={(e) => setHobbsEnd(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>

        {/* Real-time duration display */}
        <div className="bg-gray-50 p-3 rounded-md">
          <label className="block text-sm font-medium text-gray-700">
            Duration
          </label>
          <p className={`text-lg font-semibold ${isValidDuration ? 'text-gray-900' : 'text-red-600'}`}>
            {isValidDuration ? `${duration.toFixed(1)} hrs` : 'Invalid duration'}
          </p>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
            placeholder="Flight purpose, conditions, etc."
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
            disabled={updateLog.isPending || !isValidDuration}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md shadow-sm disabled:opacity-50"
          >
            {updateLog.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </Modal>
  );
}