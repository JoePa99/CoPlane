import { ExpenseList } from '../components/expenses/ExpenseList';
import { AddExpenseForm } from '../components/expenses/AddExpenseForm';
import { ExpenseTotal } from '../components/expenses/ExpenseTotal';

export default function ExpensesPage() {
  return (
    <div className="max-w-full lg:max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Expenses</h1>
      </div>
      
      <div className="mb-6">
        <ExpenseTotal />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div>
          <AddExpenseForm />
        </div>
        <div className="lg:col-span-2">
          <div className="overflow-hidden">
            <ExpenseList />
          </div>
        </div>
      </div>
    </div>
  );
}