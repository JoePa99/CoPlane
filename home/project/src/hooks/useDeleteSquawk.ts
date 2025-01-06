import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export function useDeleteSquawk() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      // First delete any associated storage files
      const { data: squawk } = await supabase
        .from('squawks')
        .select('attachment_url')
        .eq('id', id)
        .single();

      if (squawk?.attachment_url) {
        const path = squawk.attachment_url.split('/attachments/')[1];
        if (path) {
          await supabase.storage
            .from('attachments')
            .remove([path]);
        }
      }

      // Then delete the squawk
      const { error } = await supabase
        .from('squawks')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['squawks'] });
    },
  });
}