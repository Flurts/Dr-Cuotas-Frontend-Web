export default function currencyFormatter(amount: string | number): string {
  const parsed = parseFloat(`${amount}`);
  return parsed.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' });
}
