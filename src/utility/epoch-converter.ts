export function epochToDate(epochSeconds: number) {
  const date = new Date(epochSeconds * 1000); // convert seconds → milliseconds
  return date.toLocaleString(); // gives local date & time, e.g., "11/1/2025, 8:45:30 AM"
}
