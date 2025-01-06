import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { BookingSubmitData } from '../types/booking';

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (booking: BookingSubmitData) => {
      const { data, error } = await supabase
        .from('bookings')
        .insert([{
          title: booking.title,
          pilot_id: booking.pilot_id,
          start_time: booking.start_time,
          end_time: booking.end_time,
          notes: booking.notes,
        }])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message);
      }

      return data;
    },
    onError: (error) => {
      console.error('Mutation error:', error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
}