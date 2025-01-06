import { useState, useEffect } from 'react';
import { useCreateFlightLog } from '../../hooks/useCreateFlightLog';
import { useUsers } from '../../hooks/useUsers';
import { useFlightLogs } from '../../hooks/useFlightLogs';

export function FlightLogForm() {
  const { data: users = [] } = useUsers();
  const { data: flightLogs = [] } = useFlightLogs();
  const createFlightLog = useCreateFlightLog();
  
  // Get the last Hobbs time
  const lastHobbsEnd = flightLogs[0]?.hobbs_end || 0;

  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [pilotId, setPilotId] = useState('');
  const [departureAirport, setDepartureAirport] = useState('');
  const [arrivalAirport, setArrivalAirport] = useState('');
  const [hobbsStart, setHobbsStart] = useState(lastHobbsEnd.toString());
  const [hobbsEnd, setHobbsEnd] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  // Calculate duration in real-time
  const duration = parseFloat(hobbsEnd) - parseFloat(hobbsStart);
  const isValidDuration = !isNaN(duration) && duration > 0;

  // Update hobbsStart when lastHobbsEnd changes
  useEffect(() => {
    setHobbsStart(lastHobbsEnd.toString());
  }, [lastHobbsEnd]);

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

      await createFlightLog.mutateAsync({
        date,
        pilot_id: pilotId,
        departure_airport: departureAirport.toUpperCase(),
        arrival_airport: arrivalAirport.toUpperCase(),
        hobbs_start: hobbsStartNum,
        hobbs_end: hobbsEndNum,
        description: description || null
      });

      // Reset form
      setDate(new Date().toISOString().split('T')[0]);
      setPilotId('');
      setDepartureAirport('');
      setArrivalAirport('');
      setHobbsStart(hobbsEndNum.toString());
      setHobbsEnd('');
      setDescription('');
    } catch (err) {
      setError('Failed to create flight log');
    }
  };

  return (
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

      <button
        type="submit"
        disabled={createFlightLog.isPending || !isValidDuration}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
      >
        {createFlightLog.isPending ? 'Adding...' : 'Add Flight Log'}
      </button>
    </form>
  );
}