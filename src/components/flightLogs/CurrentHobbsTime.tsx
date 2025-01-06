import { useFlightLogs } from '../../hooks/useFlightLogs';

export function CurrentHobbsTime() {
  const { data: logs = [] } = useFlightLogs();
  const currentHobbs = logs[0]?.hobbs_end || 0;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900">Current Hobbs Time</h2>
      <p className="text-3xl font-bold text-primary-600 mt-2">
        {currentHobbs.toFixed(1)} hrs
      </p>
    </div>
  );
}