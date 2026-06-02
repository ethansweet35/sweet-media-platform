export function moneyR(n: number, step = 1): string {
  return `$${(Math.round(n / step) * step).toLocaleString("en-US")}`;
}

export function num1(n: number): string {
  return n >= 10
    ? Math.round(n).toLocaleString("en-US")
    : (Math.round(n * 10) / 10).toFixed(1);
}

export function pct(n: number): string {
  const v = n * 100;
  return `${v < 10 ? v.toFixed(1) : Math.round(v)}%`;
}
