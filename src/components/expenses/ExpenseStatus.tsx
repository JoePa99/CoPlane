interface ExpenseStatusProps {
  status: 'PENDING' | 'SETTLED';
}

export function ExpenseStatus({ status }: ExpenseStatusProps) {
  return (
    <span
      className={`
        inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
        ${status === 'PENDING' 
          ? 'bg-yellow-100 text-yellow-800' 
          : 'bg-green-100 text-green-800'
        }
      `}
    >
      {status === 'PENDING' ? 'Pending' : 'Settled'}
    </span>
  );
}