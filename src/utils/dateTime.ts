import { format, isAfter, isBefore, addHours } from 'date-fns';

export function formatTime(date: Date): string {
  return format(date, 'h:mm a');
}

export function formatDate(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function validateBookingTimes(start: Date, end: Date): string | null {
  if (isBefore(end, start)) {
    return 'End time must be after start time';
  }

  const minDuration = addHours(start, 1);
  if (isBefore(end, minDuration)) {
    return 'Booking must be at least 1 hour';
  }

  return null;
}