import { useState } from 'react';
import { BookingDialog } from './BookingDialog';
import { addHours } from 'date-fns';
import { BookingEvent } from './BookingEvent';
import { calculateBookingPosition } from '../../utils/bookingCalculations';
import { getTimeFromClick } from '../../utils/dateUtils';
import type { Booking } from '../../types/booking';

interface TimeSlotProps {
  date: Date;
  hour: number;
  bookings: Booking[];
}

export function TimeSlot({ date, hour, bookings }: TimeSlotProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.booking-event')) {
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const time = getTimeFromClick(date, hour, clickY, rect.height);
    
    setSelectedTime(time);
    setIsDialogOpen(true);
  };

  return (
    <>
      <div className="relative h-16 sm:h-20">
        <div 
          onClick={handleClick}
          className="absolute inset-0 cursor-pointer border-b border-gray-200"
        >
          {/* Half-hour marker */}
          <div className="absolute inset-x-0 top-1/2 border-t border-dotted border-gray-200" />
        </div>
        
        {hour === 6 && bookings.map(booking => {
          const bookingStart = new Date(booking.start_time);
          const bookingEnd = new Date(booking.end_time);
          
          const { top, height } = calculateBookingPosition(bookingStart, bookingEnd, date);
          
          return (
            <BookingEvent
              key={booking.id}
              booking={booking}
              top={top}
              height={height}
            />
          );
        })}
      </div>
      
      {selectedTime && (
        <BookingDialog
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setSelectedTime(null);
          }}
          initialStartTime={selectedTime}
          initialEndTime={addHours(selectedTime, 3)}
        />
      )}
    </>
  );
}