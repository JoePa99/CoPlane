import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { CreateSquawkData } from '../types/squawk';

export function useCreateSquawk() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateSquawkData) => {
      const { error } = await supabase
        .from('squawks')
        .insert([{
          ...data,
          status: 'OPEN'
        }]);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['squawks'] });
    },
  });
}