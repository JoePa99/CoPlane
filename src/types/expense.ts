export interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string | null;
  date: string;
  paid_by: string;
  receipt_url?: string | null;
  status: 'PENDING' | 'SETTLED';
  profiles: {
    full_name: string;
  };
}

export interface ExpenseFormData {
  amount: number;
  category: string;
  description: string | null;
  date: string;
  receipt_url?: string | null;
}