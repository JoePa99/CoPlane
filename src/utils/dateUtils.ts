export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

export function getTimeFromClick(
  date: Date,
  hour: number,
  clickY: number,
  slotHeight: number
): Date {
  const isHalfHour = clickY > slotHeight / 2;
  const time = new Date(date);
  time.setHours(hour, isHalfHour ? 30 : 0, 0, 0);
  return time;
}