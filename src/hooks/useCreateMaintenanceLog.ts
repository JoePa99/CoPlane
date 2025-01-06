import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type MaintenanceLogInsert = Database['public']['Tables']['maintenance_logs']['Insert'];

export function useCreateMaintenanceLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (log: MaintenanceLogInsert) => {
      const { data, error } = await supabase
        .from('maintenance_logs')
        .insert([log])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance'] });
    },
  });
}