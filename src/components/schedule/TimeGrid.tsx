import { format, setHours, setMinutes } from 'date-fns';

interface TimeGridProps {
  scrollRef: React.RefObject<HTMLDivElement>;
  onScroll: (e: React.UIEvent<HTMLDivElement>) => void;
}

const HOURS = Array.from({ length: 17 }, (_, i) => i + 6); // 6 AM to 10 PM

export function TimeGrid({ scrollRef, onScroll }: TimeGridProps) {
  return (
    <div className="w-12 sm:w-20 flex-shrink-0 border-r bg-gray-50">
      <div className="h-8 sm:h-12 border-b" /> {/* Header spacer */}
      <div 
        ref={scrollRef} 
        onScroll={onScroll}
        className="overflow-auto scrollbar-hide"
        style={{ height: 'calc(100% - 2rem)' }}
      >
        <div className="relative">
          {HOURS.map(hour => (
            <div
              key={hour}
              className="relative h-16 sm:h-20 border-b border-gray-200"
            >
              <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                <span className="text-xs sm:text-sm text-gray-500">
                  {format(setHours(setMinutes(new Date(), 0), hour), 'h a')}
                </span>
              </div>
            </div>
          ))}
          {/* Add an extra border at the bottom */}
          <div className="h-px bg-gray-200" />
        </div>
      </div>
    </div>
  );
}