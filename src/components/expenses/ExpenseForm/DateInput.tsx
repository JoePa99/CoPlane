import { FormField } from './FormField';

interface DateInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function DateInput({ value, onChange }: DateInputProps) {
  return (
    <FormField label="Date" htmlFor="date">
      <input
        type="date"
        id="date"
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500"
      />
    </FormField>
  );
}