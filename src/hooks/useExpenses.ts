import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Expense } from '../types/expense';

export function useExpenses() {
  return useQuery({
    queryKey: ['expenses'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('expenses')
        .select(`
          id,
          amount,
          category,
          description,
          date,
          paid_by,
          receipt_url,
          status,
          profiles:paid_by (
            full_name
          )
        `)
        .order('date', { ascending: false });

      if (error) throw error;
      return data as Expense[];
    },
  });
}