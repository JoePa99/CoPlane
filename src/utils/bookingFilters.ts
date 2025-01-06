import { isWithinInterval, startOfDay, endOfDay } from 'date-fns';
import type { Booking } from '../types/booking';

export function filterBookingsForDay(bookings: Booking[], day: Date): Booking[] {
  return bookings.filter(booking => {
    const bookingStart = new Date(booking.start_time);
    const bookingEnd = new Date(booking.end_time);
    return isWithinInterval(day, {
      start: startOfDay(bookingStart),
      end: endOfDay(bookingEnd)
    });
  });
}