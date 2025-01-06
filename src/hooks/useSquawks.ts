import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Squawk } from '../types/squawk';

export function useSquawks() {
  return useQuery({
    queryKey: ['squawks'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('squawks')
        .select(`
          *,
          profiles:reported_by (
            full_name
          )
        `)
        .order('date', { ascending: false });

      if (error) throw error;
      return data as Squawk[];
    },
  });
}