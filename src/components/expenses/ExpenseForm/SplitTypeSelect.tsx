import { FormField } from './FormField';
import { SPLIT_TYPES } from '../../../constants/expenses';

interface SplitTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function SplitTypeSelect({ value, onChange }: SplitTypeSelectProps) {
  return (
    <FormField label="Split Type" htmlFor="splitType">
      <select
        id="splitType"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
      >
        {SPLIT_TYPES.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
    </FormField>
  );
}