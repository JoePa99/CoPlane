import { useState } from 'react';
import { useCreateBooking } from './useCreateBooking';
import { useAuth } from '../contexts/AuthContext';
import { validateBookingForm } from '../utils/bookingValidation';
import { BookingFormData, BookingSubmitData } from '../types/booking';

export function useBookingForm(onSuccess: () => void) {
  const { user } = useAuth();
  const createBooking = useCreateBooking();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submitForm = async (data: BookingFormData) => {
    if (!user?.id) {
      setErrors({ auth: 'Please sign in to create bookings' });
      return;
    }

    const validationErrors = validateBookingForm(data);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const submitData: BookingSubmitData = {
        title: data.title,
        pilot_id: data.pilotId,
        start_time: data.startDate.toISOString(),
        end_time: data.endDate.toISOString(),
        notes: data.notes || null,
      };

      await createBooking.mutateAsync(submitData);
      onSuccess();
    } catch (err) {
      console.error('Booking creation error:', err);
      setErrors({ submit: err instanceof Error ? err.message : 'Failed to create booking' });
    }
  };

  return {
    submitForm,
    errors,
    isSubmitting: createBooking.isPending,
    isAuthenticated: Boolean(user?.id),
  };
}