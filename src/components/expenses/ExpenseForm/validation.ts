import { ExpenseFormData } from './types';

export function validateExpenseForm(data: ExpenseFormData): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!data.amount || parseFloat(data.amount) <= 0) {
    errors.amount = 'Amount must be greater than 0';
  }

  if (!data.date) {
    errors.date = 'Date is required';
  }

  const totalPercentage = Object.values(data.shares).reduce(
    (sum, share) => sum + share.percentage,
    0
  );

  if (Math.abs(totalPercentage - 100) > 0.01) {
    errors.shares = 'Share percentages must total 100%';
  }

  return errors;
}