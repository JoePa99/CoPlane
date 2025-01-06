import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

interface UpdateMaintenanceData {
  id: string;
  title: string;
  type: string;
  schedule_type: 'DATE' | 'HOBBS';
  due_date: string | null;
  hobbs_time: number | null;
  priority?: string;
  mechanic_name: string;
  description: string;
}

export function useUpdateMaintenanceLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateMaintenanceData) => {
      const { error } = await supabase
        .from('maintenance_logs')
        .update({
          title: data.title,
          type: data.type,
          schedule_type: data.schedule_type,
          due_date: data.due_date,
          hobbs_time: data.hobbs_time,
          priority: data.priority,
          mechanic_name: data.mechanic_name,
          description: data.description
        })
        .eq('id', data.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['maintenance'] });
    },
  });
}