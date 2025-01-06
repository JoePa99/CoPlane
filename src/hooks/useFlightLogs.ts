import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { FlightLog } from '../types/flightLog';

export function useFlightLogs() {
  return useQuery({
    queryKey: ['flightLogs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('flight_logs')
        .select(`
          *,
          profiles:pilot_id (
            full_name
          )
        `)
        .order('date', { ascending: false });

      if (error) throw error;
      return data as FlightLog[];
    },
  });
}