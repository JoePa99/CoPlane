import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { CreateFlightLogData } from '../types/flightLog';

export function useCreateFlightLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateFlightLogData) => {
      const { error } = await supabase
        .from('flight_logs')
        .insert([data]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flightLogs'] });
    },
  });
}