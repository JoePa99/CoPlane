import { format } from 'date-fns';

interface DatePickerProps {
  selected: Date;
  onChange: (date: Date) => void;
}

export function DatePicker({ selected, onChange }: DatePickerProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const [year, month, day] = e.target.value.split('-').map(Number);
    const newDate = new Date(selected);
    newDate.setFullYear(year);
    newDate.setMonth(month - 1);
    newDate.setDate(day);
    onChange(newDate);
  };

  return (
    <input
      type="date"
      value={format(selected, 'yyyy-MM-dd')}
      onChange={handleChange}
      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
    />
  );
}