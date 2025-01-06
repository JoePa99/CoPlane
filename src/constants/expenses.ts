export const EXPENSE_CATEGORIES = [
  'Fuel',
  'Maintenance',
  'Hangar',
  'Insurance',
  'Inspection',
  'Equipment',
  'Other'
] as const;

export type ExpenseCategory = typeof EXPENSE_CATEGORIES[number];

export const SPLIT_TYPES = [
  'Equal Split',
  'Custom Split'
] as const;

export type SplitType = typeof SPLIT_TYPES[number];