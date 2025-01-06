import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { UpdateSquawkData } from '../types/squawk';

export function useUpdateSquawk() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateSquawkData) => {
      const { error } = await supabase
        .from('squawks')
        .update({
          title: data.title,
          description: data.description,
          priority: data.priority,
          attachment_url: data.attachment_url
        })
        .eq('id', data.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['squawks'] });
    },
  });
}