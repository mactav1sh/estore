export const calcProductCost = (items: any, tax: number, shipping: number) => {
  const cost = items?.reduce((cur: any, item: any) => {
    return cur + Number(item.onSale ? item.salePrice : item.price);
  }, 0);
  const taxes = cost * tax;
  const shippingCost = cost * shipping;
  const totalCost = cost + taxes + shippingCost;
  return {
    cost,
    taxes,
    shippingCost,
    totalCost,
  };
};
