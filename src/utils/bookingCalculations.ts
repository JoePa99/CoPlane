import { startOfDay, endOfDay, isWithinInterval } from 'date-fns';

export const SLOT_HEIGHT = 64; // Height of one hour slot in pixels (16 * 4)

export function calculateBookingPosition(bookingStart: Date, bookingEnd: Date, currentDay: Date) {
  const dayStart = startOfDay(currentDay);
  const dayEnd = endOfDay(currentDay);
  
  // Calculate start position
  let startHour = 6; // Default to start of day (6 AM)
  let startMinutes = 0;
  
  if (isWithinInterval(bookingStart, { start: dayStart, end: dayEnd })) {
    startHour = bookingStart.getHours();
    startMinutes = bookingStart.getMinutes();
  }

  // Calculate end position
  let endHour = 22; // Default to end of day (10 PM)
  let endMinutes = 0;
  
  if (isWithinInterval(bookingEnd, { start: dayStart, end: dayEnd })) {
    endHour = bookingEnd.getHours();
    endMinutes = bookingEnd.getMinutes();
  }

  const top = (startHour - 6) * SLOT_HEIGHT + (startMinutes / 60) * SLOT_HEIGHT;
  const duration = (endHour - startHour) + (endMinutes - startMinutes) / 60;
  const height = duration * SLOT_HEIGHT;

  return { top, height };
}