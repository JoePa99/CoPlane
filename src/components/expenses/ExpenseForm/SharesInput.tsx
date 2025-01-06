import { useUsers } from '../../../hooks/useUsers';

interface SharesInputProps {
  shares: Record<string, { percentage: number }>;
  onShareChange: (userId: string, value: number) => void;
  disabled: boolean;
}

export function SharesInput({ shares, onShareChange, disabled }: SharesInputProps) {
  const { data: users = [], isLoading } = useUsers();

  if (isLoading) {
    return <div>Loading shares...</div>;
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Shares
      </label>
      <div className="space-y-2">
        {users.map((user) => (
          <div key={user.id} className="flex items-center gap-2">
            <span className="w-24 text-sm font-medium text-gray-700">
              {user.full_name}
            </span>
            <input
              type="number"
              value={shares[user.id]?.percentage ?? 0}
              onChange={(e) => onShareChange(user.id, Number(e.target.value))}
              disabled={disabled}
              min="0"
              max="100"
              className="block w-20 rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 disabled:bg-gray-100"
            />
            <span className="text-sm text-gray-500">%</span>
          </div>
        ))}
      </div>
    </div>
  );
}