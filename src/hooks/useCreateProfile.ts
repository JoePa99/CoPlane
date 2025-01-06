import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type ProfileInsert = Database['public']['Tables']['profiles']['Insert'];

export function useCreateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: ProfileInsert) => {
      const { data, error } = await supabase
        .from('profiles')
        .insert([profile])
        .select()
        .single();

      if (error) {
        console.error('Profile creation error:', error);
        throw error;
      }

      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['profile', data.id], data);
    },
  });
}