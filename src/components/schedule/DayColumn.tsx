import { format } from 'date-fns';
import { TimeSlot } from './TimeSlot';
import { filterBookingsForDay } from '../../utils/bookingFilters';
import type { Booking } from '../../types/booking';

interface DayColumnProps {
  day: Date;
  bookings: Booking[];
}

const HOURS = Array.from({ length: 17 }, (_, i) => i + 6);

export function DayColumn({ day, bookings }: DayColumnProps) {
  const dayBookings = filterBookingsForDay(bookings, day);

  return (
    <div className="flex-1 min-w-[4rem] sm:min-w-[8rem] border-r last:border-r-0">
      <div className="h-8 sm:h-12 border-b px-1 sm:px-2 flex items-center justify-center sticky top-0 bg-white z-10">
        <div className="text-xs sm:text-sm font-medium text-gray-900">
          {format(day, 'EEE d')}
        </div>
      </div>
      <div className="relative">
        {HOURS.map(hour => (
          <TimeSlot 
            key={hour} 
            date={day} 
            hour={hour}
            bookings={dayBookings}
          />
        ))}
        {/* Add an extra border at the bottom */}
        <div className="h-px bg-gray-200" />
      </div>
    </div>
  );
}