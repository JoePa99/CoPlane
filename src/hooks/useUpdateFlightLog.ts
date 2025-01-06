import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { FlightLog } from '../types/flightLog';

export function useUpdateFlightLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<FlightLog> & { id: string }) => {
      const { error } = await supabase
        .from('flight_logs')
        .update({
          date: data.date,
          pilot_id: data.pilot_id,
          departure_airport: data.departure_airport,
          arrival_airport: data.arrival_airport,
          hobbs_start: data.hobbs_start,
          hobbs_end: data.hobbs_end,
          description: data.description
        })
        .eq('id', data.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flightLogs'] });
    },
  });
}