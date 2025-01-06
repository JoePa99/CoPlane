import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export function useDeleteFlightLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('flight_logs')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['flightLogs'] });
    },
  });
}