export interface BookingValidation {
  title: string | null;
  times: string | null;
}

export function validateBooking(
  title: string,
  startTime: Date,
  endTime: Date
): BookingValidation {
  const errors: BookingValidation = {
    title: null,
    times: null,
  };

  if (!title.trim()) {
    errors.title = 'Title is required';
  } else if (title.length < 3) {
    errors.title = 'Title must be at least 3 characters';
  }

  const now = new Date();
  if (startTime < now) {
    errors.times = 'Cannot book in the past';
  }

  return errors;
}