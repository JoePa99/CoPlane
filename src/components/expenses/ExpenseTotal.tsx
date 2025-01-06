import { useExpenses } from '../../hooks/useExpenses';

export function ExpenseTotal() {
  const { data: expenses = [] } = useExpenses();
  
  const total = expenses
    .filter(exp => exp.status === 'PENDING')
    .reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h2 className="text-lg font-semibold text-gray-900">Outstanding Balance</h2>
      <p className="text-3xl font-bold text-primary-600 mt-2">
        ${total.toFixed(2)}
      </p>
    </div>
  );
}