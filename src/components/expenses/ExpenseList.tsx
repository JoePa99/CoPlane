import { ExpenseItem } from './ExpenseItem';
import { useExpenses } from '../../hooks/useExpenses';

export function ExpenseList() {
  const { data: expenses = [], isLoading } = useExpenses();

  if (isLoading) {
    return <div className="p-4 bg-white rounded-lg shadow">Loading expenses...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Recent Expenses</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {expenses.length === 0 ? (
          <p className="p-4 text-gray-500 text-center">No expenses found</p>
        ) : (
          expenses.map((expense) => (
            <ExpenseItem key={expense.id} expense={expense} />
          ))
        )}
      </div>
    </div>
  );
}