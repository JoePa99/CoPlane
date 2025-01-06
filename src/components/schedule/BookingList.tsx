import { format, isAfter } from 'date-fns';
import { Clock } from 'lucide-react';
import { useBookings } from '../../hooks/useBookings';

export function BookingList() {
  const { data: bookings = [], isLoading, error } = useBookings();

  if (isLoading) {
    return <div className="text-gray-600">Loading bookings...</div>;
  }

  if (error) {
    return <div className="text-primary-600">Error loading bookings</div>;
  }

  const now = new Date();
  const upcomingBookings = bookings
    .filter(booking => isAfter(new Date(booking.end_time), now))
    .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
    .slice(0, 5); // Show only next 5 bookings

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Upcoming Bookings</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {upcomingBookings.length === 0 ? (
          <div className="p-4 text-gray-500 text-center">No upcoming bookings</div>
        ) : (
          upcomingBookings.map((booking) => (
            <div key={booking.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {booking.title}
                  </h3>
                  <p className="text-sm text-gray-500">{booking.flight_type}</p>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  <time dateTime={booking.start_time}>
                    {format(new Date(booking.start_time), 'MMM d, h:mm a')}
                  </time>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}