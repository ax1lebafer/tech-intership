export function formatTime(date: string) {
  const newDate = new Date(date);

  const day = String(newDate.getDate()).padStart(2, '0');
  const month = String(newDate.getMonth()).padStart(2, '0');
  const year = String(newDate.getFullYear());

  return `${day}.${month}.${year}`;
}
