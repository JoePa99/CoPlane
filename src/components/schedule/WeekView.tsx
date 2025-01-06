import { useState, useRef, useEffect } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TimeGrid } from './TimeGrid';
import { WeekGrid } from './WeekGrid';

export function WeekView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const weekStart = startOfWeek(currentDate);
  const timeGridRef = useRef<HTMLDivElement>(null);
  const weekGridRef = useRef<HTMLDivElement>(null);

  const handleTimeGridScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (weekGridRef.current) {
      weekGridRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  const handleWeekGridScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (timeGridRef.current) {
      timeGridRef.current.scrollTop = e.currentTarget.scrollTop;
    }
  };

  // Scroll to 7 AM by default
  useEffect(() => {
    if (timeGridRef.current) {
      const hourHeight = 80; // Height of one hour slot
      const scrollTo = (7 - 6) * hourHeight; // 7 AM minus start hour (6 AM) times slot height
      timeGridRef.current.scrollTop = scrollTo;
    }
  }, []);

  const previousWeek = () => setCurrentDate(addDays(currentDate, -7));
  const nextWeek = () => setCurrentDate(addDays(currentDate, 7));
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="bg-white rounded-lg shadow h-[calc(100vh-12rem)] flex flex-col">
      <div className="flex items-center justify-between p-2 sm:p-4 border-b">
        <button onClick={previousWeek} className="p-1 sm:p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
        </button>
        <h2 className="text-sm sm:text-lg font-semibold text-gray-900">
          {format(weekStart, 'MMMM d')} - {format(addDays(weekStart, 6), 'MMMM d, yyyy')}
        </h2>
        <button onClick={nextWeek} className="p-1 sm:p-2 hover:bg-gray-100 rounded-full">
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <TimeGrid scrollRef={timeGridRef} onScroll={handleTimeGridScroll} />
        <WeekGrid weekDays={weekDays} scrollRef={weekGridRef} onScroll={handleWeekGridScroll} />
      </div>
    </div>
  );
}