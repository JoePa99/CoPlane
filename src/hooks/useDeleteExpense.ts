import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

export function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      // First delete any associated storage files
      const { data: expense } = await supabase
        .from('expenses')
        .select('receipt_url')
        .eq('id', id)
        .single();

      if (expense?.receipt_url) {
        // Extract the path from the full URL
        // URL format: https://<domain>/storage/v1/object/public/receipts/<filename>
        const path = expense.receipt_url.split('/receipts/')[1];
        if (path) {
          const { error: storageError } = await supabase.storage
            .from('receipts')
            .remove([path]);
            
          if (storageError) {
            console.error('Failed to delete receipt:', storageError);
          }
        }
      }

      // Then delete the expense (cascade will handle shares)
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Delete error:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });
}