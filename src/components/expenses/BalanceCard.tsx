interface BalanceCardProps {
  title: string;
  amount: number;
  type?: 'balance' | 'net';
}

export function BalanceCard({ title, amount, type = 'balance' }: BalanceCardProps) {
  if (type === 'net') {
    const formattedAmount = Math.abs(amount).toFixed(2);
    const message = amount > 0 
      ? `Sean owes Joe $${formattedAmount}`
      : amount < 0
        ? `Joe owes Sean $${formattedAmount}`
        : 'No outstanding balance';

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-lg text-gray-600">{message}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className={`text-2xl font-bold ${amount >= 0 ? 'text-green-600' : 'text-primary-600'}`}>
        ${amount.toFixed(2)}
      </p>
    </div>
  );
}