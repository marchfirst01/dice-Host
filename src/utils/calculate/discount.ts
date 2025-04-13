export default function discount({ discount, price }: { discount: number; price: number }) {
  const discountPrice = price * (1 - discount / 100);
  return discountPrice;
}
