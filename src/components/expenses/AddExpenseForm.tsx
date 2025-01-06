import { useCreateExpense } from '../../hooks/useCreateExpense';
import { ExpenseForm } from './ExpenseForm';
import { useUsers } from '../../hooks/useUsers';

export function AddExpenseForm() {
  const createExpense = useCreateExpense();
  const { data: users = [] } = useUsers();

  const getOtherUserId = (currentUserId: string) => {
    const otherUser = users.find(user => user.id !== currentUserId);
    return otherUser?.id;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Add Expense</h2>
      
      <ExpenseForm
        onSubmit={async (data) => {
          const otherUserId = getOtherUserId(data.paid_by);
          if (!otherUserId) {
            throw new Error('Could not determine other user');
          }

          await createExpense.mutateAsync({
            amount: data.amount,
            category: data.category,
            description: data.description,
            date: data.date,
            paid_by: data.paid_by,
            receipt_url: data.receipt_url,
            split_type: 'EQUAL',
            shares: [
              { 
                profile_id: data.paid_by, 
                percentage: 50, 
                amount: data.amount * 0.5 
              },
              { 
                profile_id: otherUserId,
                percentage: 50, 
                amount: data.amount * 0.5 
              }
            ]
          });
        }}
      />
    </div>
  );
}