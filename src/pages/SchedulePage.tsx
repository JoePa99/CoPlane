import { BookingCalendar } from '../components/schedule/BookingCalendar';
import { BookingList } from '../components/schedule/BookingList';
import { NewBookingButton } from '../components/schedule/NewBookingButton';

export default function SchedulePage() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Flight Schedule</h1>
        <NewBookingButton />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <BookingCalendar />
        </div>
        <div>
          <BookingList />
        </div>
      </div>
    </div>
  );
}