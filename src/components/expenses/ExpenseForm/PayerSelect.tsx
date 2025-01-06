import { FormField } from './FormField';
import { useUsers } from '../../../hooks/useUsers';

interface PayerSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function PayerSelect({ value, onChange }: PayerSelectProps) {
  const { data: users = [], isLoading } = useUsers();

  if (isLoading) {
    return (
      <FormField label="Paid By" htmlFor="paidBy">
        <select disabled className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 bg-gray-100">
          <option>Loading users...</option>
        </select>
      </FormField>
    );
  }

  return (
    <FormField label="Paid By" htmlFor="paidBy">
      <select
        id="paidBy"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
      >
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.full_name}
          </option>
        ))}
      </select>
    </FormField>
  );
}