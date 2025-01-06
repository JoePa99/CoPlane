import { DayColumn } from './DayColumn';
import { useBookings } from '../../hooks/useBookings';

interface WeekGridProps {
  weekDays: Date[];
  scrollRef: React.RefObject<HTMLDivElement>;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
}

export function WeekGrid({ weekDays, scrollRef, onScroll }: WeekGridProps) {
  const { data: bookings = [], isLoading, error } = useBookings();

  if (isLoading) {
    return <div>Loading bookings...</div>;
  }

  if (error) {
    console.error('Error loading bookings:', error);
    return <div>Error loading bookings</div>;
  }

  return (
    <div 
      className="flex-1 overflow-auto" 
      ref={scrollRef} 
      onScroll={onScroll}
      style={{ height: 'calc(100% - 2rem)' }}
    >
      <div className="flex min-w-full relative">
        {weekDays.map(day => (
          <DayColumn 
            key={day.toISOString()} 
            day={day} 
            bookings={bookings}
          />
        ))}
      </div>
    </div>
  );
}