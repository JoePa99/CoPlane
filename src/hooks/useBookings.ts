import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Booking } from '../types/booking';

export function useBookings() {
  return useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          profiles:pilot_id (
            full_name
          )
        `)
        .order('start_time', { ascending: true });

      if (error) {
        console.error('Error fetching bookings:', error);
        throw error;
      }
      
      return data as Booking[];
    },
  });
}