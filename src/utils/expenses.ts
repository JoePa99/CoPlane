import type { Expense } from '../types/expense';

export function calculateBalances(expenses: Expense[]) {
  const balances = {
    joe: 0,
    sean: 0,
    netBalance: 0 // Positive means Sean owes Joe
  };

  // Only consider PENDING expenses
  const pendingExpenses = expenses.filter(expense => expense.status === 'PENDING');

  pendingExpenses.forEach(expense => {
    const amount = parseFloat(expense.amount.toString());
    const isJoe = expense.profiles.full_name.toLowerCase().includes('joe');
    
    if (isJoe) {
      // Joe paid
      balances.joe += amount; // Joe paid the full amount
      if (expense.split_type === 'EQUAL') {
        balances.sean -= amount / 2; // Sean owes half
      } else {
        // Handle custom split
        const seanShare = expense.shares?.find(share => 
          !share.profiles.full_name.toLowerCase().includes('joe')
        );
        if (seanShare) {
          balances.sean -= (amount * seanShare.percentage) / 100;
        }
      }
    } else {
      // Sean paid
      balances.sean += amount; // Sean paid the full amount
      if (expense.split_type === 'EQUAL') {
        balances.joe -= amount / 2; // Joe owes half
      } else {
        // Handle custom split
        const joeShare = expense.shares?.find(share => 
          share.profiles.full_name.toLowerCase().includes('joe')
        );
        if (joeShare) {
          balances.joe -= (amount * joeShare.percentage) / 100;
        }
      }
    }
  });

  // Calculate net balance (positive means Sean owes Joe)
  balances.netBalance = -balances.joe; // From Sean's perspective

  return balances;
}