import { Pencil, Trash2, Receipt, CheckCircle } from 'lucide-react';
import { useDeleteExpense } from '../../hooks/useDeleteExpense';
import { useSettleExpense } from '../../hooks/useSettleExpense';

interface ExpenseActionsProps {
  expenseId: string;
  receiptUrl: string | null;
  status: 'PENDING' | 'SETTLED';
  onEdit: () => void;
}

export function ExpenseActions({ expenseId, receiptUrl, status, onEdit }: ExpenseActionsProps) {
  const deleteExpense = useDeleteExpense();
  const settleExpense = useSettleExpense();

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this expense?')) return;
    
    try {
      await deleteExpense.mutateAsync(expenseId);
    } catch (error) {
      console.error('Failed to delete expense:', error);
      alert('Failed to delete expense. Please try again.');
    }
  };

  const handleSettle = async () => {
    if (!confirm('Are you sure you want to mark this expense as settled?')) return;
    
    try {
      await settleExpense.mutateAsync(expenseId);
    } catch (error) {
      console.error('Failed to settle expense:', error);
      alert('Failed to settle expense. Please try again.');
    }
  };

  return (
    <div className="flex gap-2">
      {status === 'PENDING' && (
        <button
          onClick={handleSettle}
          className="text-green-500 hover:text-green-600"
          title="Mark as Settled"
        >
          <CheckCircle className="w-4 h-4" />
        </button>
      )}
      {receiptUrl && (
        <a
          href={receiptUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-600"
          title="View Receipt"
        >
          <Receipt className="w-4 h-4" />
        </a>
      )}
      <button
        onClick={onEdit}
        className="text-gray-400 hover:text-gray-600"
        title="Edit"
      >
        <Pencil className="w-4 h-4" />
      </button>
      <button
        onClick={handleDelete}
        className="text-gray-400 hover:text-gray-600"
        title="Delete"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}