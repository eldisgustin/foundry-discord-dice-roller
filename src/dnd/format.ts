export function formatNumberNotation(value: number) {
  if (isNaN(value) || value === 0) {
    return "";
  }
  const sign = Math.sign(value) >= 0 ? "+" : "-";

  return `${sign} ${Math.abs(value)}`;
}
