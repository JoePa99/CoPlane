import { MaintenanceList } from '../components/maintenance/MaintenanceList';
import { QuickLogButton } from '../components/maintenance/QuickLogButton';
import { ScheduledMaintenanceButton } from '../components/maintenance/ScheduledMaintenanceButton';
import { CurrentHobbsTime } from '../components/flightLogs/CurrentHobbsTime';

export default function MaintenancePage() {
  return (
    <div className="max-w-full lg:max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Maintenance</h1>
        <div className="flex flex-wrap gap-4">
          <QuickLogButton />
          <ScheduledMaintenanceButton />
        </div>
      </div>

      <div className="mb-6">
        <CurrentHobbsTime />
      </div>
      
      <div className="overflow-hidden">
        <MaintenanceList />
      </div>
    </div>
  );
}