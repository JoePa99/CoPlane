import { FormField } from './FormField';
import { EXPENSE_CATEGORIES } from '../../../constants/expenses';

interface CategorySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function CategorySelect({ value, onChange }: CategorySelectProps) {
  return (
    <FormField label="Category" htmlFor="category">
      <select
        id="category"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
      >
        {EXPENSE_CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </FormField>
  );
}