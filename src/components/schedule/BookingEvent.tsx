import { format } from 'date-fns';
import { useState } from 'react';
import { EditBookingDialog } from './EditBookingDialog';
import type { Booking } from '../../types/booking';

interface BookingEventProps {
  booking: Booking;
  top: number;
  height: number;
}

const PILOT_COLORS: Record<string, string> = {
  'Joe Flight': 'bg-orange-500',
  'Sean Flight': 'bg-blue-500',
  'Other': 'bg-gray-600'
};

export function BookingEvent({ booking, top, height }: BookingEventProps) {
  const [isEditing, setIsEditing] = useState(false);
  const startTime = new Date(booking.start_time);
  const endTime = new Date(booking.end_time);
  
  const pilotName = booking.profiles?.full_name || (booking.notes || 'Other');
  
  let color = PILOT_COLORS['Other'];
  if (pilotName.includes('Joe')) {
    color = PILOT_COLORS['Joe Flight'];
  } else if (pilotName.includes('Sean')) {
    color = PILOT_COLORS['Sean Flight'];
  }

  return (
    <>
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsEditing(true);
        }}
        className={`
          absolute left-0.5 right-0.5 ${color} text-white 
          rounded overflow-hidden cursor-pointer transition-all duration-200 
          hover:ring-2 hover:ring-primary-500 hover:ring-opacity-50 hover:shadow-lg
          pointer-events-auto text-xs sm:text-sm
        `}
        style={{ 
          top: `${top}px`, 
          height: `${height}px`,
          zIndex: 20
        }}
      >
        <div className="p-1 sm:p-2">
          <div className="font-medium truncate">{booking.title}</div>
          <div className="opacity-90 text-[10px] sm:text-xs">
            {format(startTime, 'h:mm a')}
          </div>
        </div>
      </div>

      <EditBookingDialog
        booking={booking}
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
      />
    </>
  );
}