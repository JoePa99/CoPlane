import { useState } from 'react';
import { format } from 'date-fns';
import { ExpenseModal } from './ExpenseModal';
import { ExpenseActions } from './ExpenseActions';
import type { Expense } from '../../types/expense';

interface ExpenseItemProps {
  expense: Expense;
}

export function ExpenseItem({ expense }: ExpenseItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <div className="p-4 hover:bg-gray-50">
        <div className="flex justify-between items-start">
          <div>
            <p className="font-medium text-gray-900">{expense.description || expense.category}</p>
            <p className="text-sm text-gray-500">
              Paid by {expense.profiles.full_name}
              {expense.status === 'SETTLED' && (
                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                  Settled
                </span>
              )}
            </p>
          </div>
          <div className="flex items-start gap-4">
            <div className="text-right">
              <p className="font-medium text-gray-900">${expense.amount.toFixed(2)}</p>
              <p className="text-sm text-gray-500">{format(new Date(expense.date), 'MMM d, yyyy')}</p>
            </div>
            <ExpenseActions
              expenseId={expense.id}
              receiptUrl={expense.receipt_url || null}
              status={expense.status}
              onEdit={() => setIsEditing(true)}
            />
          </div>
        </div>
      </div>

      <ExpenseModal
        expense={expense}
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
      />
    </>
  );
}