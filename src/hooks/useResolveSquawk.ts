import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { ResolveSquawkData } from '../types/squawk';

export function useResolveSquawk() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ResolveSquawkData) => {
      const { error } = await supabase
        .from('squawks')
        .update({
          status: 'CLOSED',
          resolution: data.resolution,
          resolved_by: data.resolved_by,
          resolved_at: new Date().toISOString()
        })
        .eq('id', data.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['squawks'] });
    },
  });
}