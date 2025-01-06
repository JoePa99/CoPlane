import { format } from 'date-fns';

interface TimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
}

export function TimePicker({ value, onChange }: TimePickerProps) {
  const times = [];
  for (let hour = 6; hour <= 22; hour++) {
    for (let minute of [0, 30]) {
      const date = new Date();
      date.setHours(hour, minute);
      times.push({
        value: format(date, 'HH:mm'),
        label: format(date, 'h:mm a')
      });
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [hours, minutes] = e.target.value.split(':').map(Number);
    const newDate = new Date(value);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    onChange(newDate);
  };

  return (
    <select
      value={format(value, 'HH:mm')}
      onChange={handleChange}
      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
    >
      {times.map(({ value: timeValue, label }) => (
        <option key={timeValue} value={timeValue}>
          {label}
        </option>
      ))}
    </select>
  );
}