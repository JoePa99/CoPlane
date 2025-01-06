import type { ExpenseCategory, SplitType } from '../../../constants/expenses';

export interface Share {
  percentage: number;
}

export interface Shares {
  [userId: string]: Share;
}

export interface ExpenseFormData {
  amount: string;
  category: ExpenseCategory;
  description: string;
  date: string;
  paidBy: string;
  splitType: SplitType;
  shares: Shares;
}

export interface ExpenseFormHandlers {
  setAmount: (value: string) => void;
  setCategory: (value: ExpenseCategory) => void;
  setDescription: (value: string) => void;
  setDate: (value: string) => void;
  setPaidBy: (value: string) => void;
  setSplitType: (value: SplitType) => void;
  handleShareChange: (userId: string, value: number) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}