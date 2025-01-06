import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

interface UpdateExpenseData {
  id: string;
  amount: number;
  category: string;
  description: string | null;
  date: string;
  receipt_url?: string | null;
}

export function useUpdateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateExpenseData) => {
      const { error } = await supabase
        .from('expenses')
        .update({
          amount: data.amount,
          category: data.category,
          description: data.description,
          date: data.date,
          receipt_url: data.receipt_url
        })
        .eq('id', data.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });
}