import { useState } from 'react';
import { useCreateExpense } from '../../../hooks/useCreateExpense';
import { useUsers } from '../../../hooks/useUsers';
import { useAuth } from '../../../contexts/AuthContext';
import { EXPENSE_CATEGORIES, SPLIT_TYPES } from '../../../constants/expenses';
import type { ExpenseFormData } from './types';
import { validateExpenseForm } from './validation';

export function useExpenseForm() {
  const { user } = useAuth();
  const { data: users = [] } = useUsers();
  const createExpense = useCreateExpense();
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const defaultShares = users.reduce((acc, user) => {
    acc[user.id] = { percentage: 100 / users.length };
    return acc;
  }, {} as Record<string, { percentage: number }>);

  const [formData, setFormData] = useState<ExpenseFormData>({
    amount: '',
    category: EXPENSE_CATEGORIES[0],
    description: '',
    date: new Date().toISOString().split('T')[0],
    paidBy: user?.id ?? '',
    splitType: SPLIT_TYPES[0],
    shares: defaultShares
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id) {
      setErrors({ auth: 'You must be logged in to create expenses' });
      return;
    }

    const validationErrors = validateExpenseForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const amount = parseFloat(formData.amount);
      const shares = Object.entries(formData.shares).map(([userId, share]) => ({
        profile_id: userId,
        percentage: share.percentage,
        amount: (amount * share.percentage) / 100
      }));

      await createExpense.mutateAsync({
        amount,
        category: formData.category,
        description: formData.description || null,
        date: formData.date,
        paid_by: formData.paidBy,
        split_type: formData.splitType === 'Equal Split' ? 'EQUAL' : 'CUSTOM',
        shares
      });

      // Reset form
      setFormData({
        amount: '',
        category: EXPENSE_CATEGORIES[0],
        description: '',
        date: new Date().toISOString().split('T')[0],
        paidBy: user.id,
        splitType: SPLIT_TYPES[0],
        shares: defaultShares
      });
      setErrors({});
    } catch (error) {
      console.error('Failed to create expense:', error);
      setErrors({ 
        submit: error instanceof Error ? error.message : 'Failed to create expense' 
      });
    }
  };

  const handleShareChange = (userId: string, value: number) => {
    if (formData.splitType === 'Equal Split') {
      const equalShare = 100 / users.length;
      const newShares = users.reduce((acc, user) => {
        acc[user.id] = { percentage: equalShare };
        return acc;
      }, {} as Record<string, { percentage: number }>);
      
      setFormData(prev => ({ ...prev, shares: newShares }));
    } else {
      const otherUsers = users.filter(u => u.id !== userId);
      const remainingShare = (100 - value) / otherUsers.length;
      
      const newShares = {
        [userId]: { percentage: value },
        ...otherUsers.reduce((acc, user) => {
          acc[user.id] = { percentage: remainingShare };
          return acc;
        }, {} as Record<string, { percentage: number }>)
      };
      
      setFormData(prev => ({ ...prev, shares: newShares }));
    }
  };

  return {
    formData,
    handlers: {
      setAmount: (value) => setFormData(prev => ({ ...prev, amount: value })),
      setCategory: (value) => setFormData(prev => ({ ...prev, category: value })),
      setDescription: (value) => setFormData(prev => ({ ...prev, description: value })),
      setDate: (value) => setFormData(prev => ({ ...prev, date: value })),
      setPaidBy: (value) => setFormData(prev => ({ ...prev, paidBy: value })),
      setSplitType: (value) => setFormData(prev => ({ ...prev, splitType: value })),
      handleShareChange,
      handleSubmit
    },
    errors,
    isSubmitting: createExpense.isPending
  };
}