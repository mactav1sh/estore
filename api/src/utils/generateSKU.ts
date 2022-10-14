export function generateSKU(length: number) {
  let SKU = '';
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    let randomIndex = Math.floor(Math.random() * chars.length);

    SKU += chars[randomIndex];
  }

  return SKU;
}
