export function isToday(timestamp: number) {
  const today = new Date();

  return (
    new Date(timestamp).toLocaleDateString() === today.toLocaleDateString()
  );
}

export function isYesterday(timestamp: number) {
  const today = new Date();

  return (
    new Date(timestamp).toLocaleDateString() ===
    new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 1
    ).toLocaleDateString()
  );
}
