import { FlightLogForm } from '../components/flightLogs/FlightLogForm';
import { FlightLogList } from '../components/flightLogs/FlightLogList';
import { CurrentHobbsTime } from '../components/flightLogs/CurrentHobbsTime';

export default function FlightLogsPage() {
  return (
    <div className="max-w-full lg:max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Flight Logs</h1>
      </div>

      <div className="mb-6">
        <CurrentHobbsTime />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">New Flight Log</h2>
            <FlightLogForm />
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="overflow-hidden">
            <FlightLogList />
          </div>
        </div>
      </div>
    </div>
  );
}