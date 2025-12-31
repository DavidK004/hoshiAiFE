export function arraysEqual(a: number[], b: number[]): boolean {
  if (a === b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) return false;

  a = [...a].sort((x, y) => x - y);
  b = [...b].sort((x, y) => x - y);

  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

export const formatDate = (dateString: string | undefined | null) => {
  if (!dateString) return "N/A";

  const date = new Date(dateString);

  const pad = (num: number) => num.toString().padStart(2, "0");

  const day = pad(date.getDate());
  const month = pad(date.getMonth() + 1);
  const year = date.getFullYear();
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
