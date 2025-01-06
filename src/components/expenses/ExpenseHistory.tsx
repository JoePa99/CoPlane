import { useState } from 'react';
import { format } from 'date-fns';
import { useExpenses } from '../../hooks/useExpenses';
import { ExpenseStatus } from './ExpenseStatus';
import { ExpenseActions } from './ExpenseActions';
import { ExpenseForm } from './ExpenseForm';
import { Modal } from '../Modal';

export function ExpenseHistory() {
  const { data: expenses = [] } = useExpenses();
  const [editingExpense, setEditingExpense] = useState<string | null>(null);

  return (
    <>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Expense History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Paid By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Split
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {expenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {format(new Date(expense.date), 'MM/dd/yyyy')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {expense.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {expense.description || '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${expense.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {expense.profiles.full_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {expense.split_type === 'EQUAL' ? '50/50' : 'Custom'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ExpenseStatus status={expense.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <ExpenseActions
                      expense={expense}
                      onEdit={() => setEditingExpense(expense.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingExpense && (
        <Modal
          isOpen={true}
          onClose={() => setEditingExpense(null)}
          title="Edit Expense"
        >
          <ExpenseForm
            expense={expenses.find(e => e.id === editingExpense)}
            onSuccess={() => setEditingExpense(null)}
          />
        </Modal>
      )}
    </>
  );
}