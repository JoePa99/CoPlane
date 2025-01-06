import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

interface CompleteMaintenanceData {
  id: string;
  completion_date: string;
  completed_by: string;
}

export function useCompleteMaintenanceLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CompleteMaintenanceData) => {
      const { error } = await supabase
        .from('maintenance_logs')
        .update({
          status: 'COMPLETED',
          completion_date: data.completion_date,
          completed_by: data.completed_by
        })
        .eq('id', data.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance'] });
    },
  });
}