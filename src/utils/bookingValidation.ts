import { BookingFormData } from '../types/booking';
import { validateBookingTimes } from './dateTime';

export function validateBookingForm(data: BookingFormData) {
  const errors: Record<string, string> = {};

  // Validate title
  if (!data.title.trim()) {
    errors.title = 'Title is required';
  } else if (data.title.length < 3) {
    errors.title = 'Title must be at least 3 characters';
  }

  // Validate times
  const timeError = validateBookingTimes(data.startDate, data.endDate);
  if (timeError) errors.times = timeError;

  // Validate notes for other pilot
  if (data.pilotType === 'other' && !data.notes.trim()) {
    errors.notes = 'Notes are required when selecting Other as pilot';
  }

  return errors;
}