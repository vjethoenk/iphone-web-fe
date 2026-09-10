/**
 * Formats a numeric amount to Vietnamese Dong standard format (e.g. 29.990.000 ₫)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("vi-VN").format(amount) + " ₫";
}
