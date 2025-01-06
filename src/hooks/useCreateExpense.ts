import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

interface ExpenseShare {
  profile_id: string;
  percentage: number;
  amount: number;
}

interface ExpenseData {
  amount: number;
  category: string;
  description: string | null;
  date: string;
  paid_by: string;
  receipt_url?: string | null;
  split_type: 'EQUAL';
  shares: ExpenseShare[];
}

export function useCreateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (expense: ExpenseData) => {
      // Create the expense
      const { data: expenseData, error: expenseError } = await supabase
        .from('expenses')
        .insert([{
          amount: expense.amount,
          category: expense.category,
          description: expense.description,
          date: expense.date,
          paid_by: expense.paid_by,
          receipt_url: expense.receipt_url,
          split_type: expense.split_type,
          status: 'PENDING'
        }])
        .select()
        .single();

      if (expenseError) throw expenseError;
      if (!expenseData) throw new Error('No expense data returned');

      // Create the shares
      const { error: sharesError } = await supabase
        .from('expense_shares')
        .insert(
          expense.shares.map(share => ({
            expense_id: expenseData.id,
            profile_id: share.profile_id,
            percentage: share.percentage,
            amount: share.amount
          }))
        );

      if (sharesError) throw sharesError;

      return expenseData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });
}