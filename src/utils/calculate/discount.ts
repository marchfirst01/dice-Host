export default function discount(discount: number, price: number) {
  const discountPrice = Math.round(price * (1 - discount / 100));
  return discountPrice;
}
