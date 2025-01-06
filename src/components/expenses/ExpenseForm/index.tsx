import { useEffect } from 'react';
import { AmountInput } from './AmountInput';
import { CategorySelect } from './CategorySelect';
import { DateInput } from './DateInput';
import { DescriptionInput } from './DescriptionInput';
import { PayerSelect } from './PayerSelect';
import { SharesInput } from './SharesInput';
import { SplitTypeSelect } from './SplitTypeSelect';
import { useExpenseForm } from './useExpenseForm';
import type { Expense } from '../../../types/expense';

interface ExpenseFormProps {
  expense?: Expense;
  onSuccess?: () => void;
}

export function ExpenseForm({ expense, onSuccess }: ExpenseFormProps) {
  const { formData, handlers, isSubmitting, resetForm } = useExpenseForm(onSuccess);

  // Initialize form with expense data if editing
  useEffect(() => {
    if (expense) {
      handlers.setAmount(expense.amount.toString());
      handlers.setCategory(expense.category);
      handlers.setDescription(expense.description || '');
      handlers.setDate(expense.date);
      handlers.setPaidBy(expense.paid_by);
      handlers.setSplitType(expense.split_type === 'EQUAL' ? 'Equal Split' : 'Custom Split');
      
      // Set shares if available
      if (expense.shares) {
        const shares = expense.shares.reduce((acc, share) => {
          acc[share.profile_id] = { percentage: share.percentage };
          return acc;
        }, {} as Record<string, { percentage: number }>);
        handlers.setShares(shares);
      }
    }
  }, [expense]);

  return (
    <form onSubmit={handlers.handleSubmit} className="space-y-4">
      <DateInput 
        value={formData.date}
        onChange={handlers.setDate}
      />
      
      <AmountInput
        value={formData.amount}
        onChange={handlers.setAmount}
      />
      
      <CategorySelect
        value={formData.category}
        onChange={handlers.setCategory}
      />
      
      <PayerSelect
        value={formData.paidBy}
        onChange={handlers.setPaidBy}
      />
      
      <DescriptionInput
        value={formData.description}
        onChange={handlers.setDescription}
      />
      
      <SplitTypeSelect
        value={formData.splitType}
        onChange={handlers.setSplitType}
      />
      
      <SharesInput
        shares={formData.shares}
        onShareChange={handlers.handleShareChange}
        disabled={formData.splitType === 'Equal Split'}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
      >
        {isSubmitting ? (expense ? 'Saving...' : 'Adding...') : (expense ? 'Save Changes' : 'Record Expense')}
      </button>
    </form>
  );
}