import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type MaintenanceLog = Database['public']['Tables']['maintenance_logs']['Row'];

export function useMaintenanceLogs() {
  return useQuery({
    queryKey: ['maintenance'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('maintenance_logs')
        .select('*')
        .order('due_date', { ascending: true, nullsLast: true });

      if (error) throw error;
      return data as MaintenanceLog[];
    },
  });
}