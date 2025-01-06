import { useMemo } from 'react';
import { useExpenses } from '../../hooks/useExpenses';
import { calculateBalances } from '../../utils/expenses';
import { BalanceCard } from './BalanceCard';

export function BalanceSummary() {
  const { data: expenses = [] } = useExpenses();
  
  const balances = useMemo(() => calculateBalances(expenses), [expenses]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <BalanceCard title="Joe's Balance" amount={balances.joe} />
      <BalanceCard title="Sean's Balance" amount={balances.sean} />
      <BalanceCard title="Net Balance" amount={balances.netBalance} type="net" />
    </div>
  );
}