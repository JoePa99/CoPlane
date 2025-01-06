import { useState } from 'react';
import { Modal } from '../Modal';
import { ExpenseForm } from './ExpenseForm';
import { useUpdateExpense } from '../../hooks/useUpdateExpense';
import type { Expense } from '../../types/expense';

interface ExpenseModalProps {
  expense: Expense;
  isOpen: boolean;
  onClose: () => void;
}

export function ExpenseModal({ expense, isOpen, onClose }: ExpenseModalProps) {
  const updateExpense = useUpdateExpense();
  const [error, setError] = useState('');

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Expense">
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}

      <ExpenseForm
        expense={expense}
        onSubmit={async (data) => {
          try {
            await updateExpense.mutateAsync({
              id: expense.id,
              ...data
            });
            onClose();
          } catch (err) {
            setError('Failed to update expense');
          }
        }}
      />
    </Modal>
  );
}